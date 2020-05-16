'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const _ = require('lodash')
const __ = require('../../../helpers/response')
const CartModel = require('../../../models/cart')
const ProductModel = require('../../../models/product')

const util = require('./../../../helpers/util')
const deliveryCharge = constant.deliveryCharge
const MinPurchaseToAvailShippingCost = util.changeToPaisa(constant.MinPurchaseToAvailShippingCost)
const validateCart = (data) => {
  let error
  switch (true) {
    case (!(data && data.quantity && data.quantity.constructor === Number )):
      error = new Error('Please provide quantity')
      break
    case (!(data && data.product && objectId.isValid(data.product))):
      error = new Error('Please provide product')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}


class Cart {
  async createCart(req, res) {
    try {
      const { body, user, franchise } = req
      validateCart(body)
      const product = await ProductModel.findOne({ _id: body.product, isDeleted: false })
      if(!product) {
        return __.send(res, 400, 'Product not found')
      }
      body.totalPrice = util.changeToPaisa(product.discountPrice * body.quantity)
      body.franchiseId = franchise._id
      let cart = new CartModel(body)
      cart.user = user._id
      cart.isDeleted = false
      cart = await cart.save()
      if(_.get(cart, 'productMeta.length', 0)) {
        cart = await CartModel.populate(cart, {path: 'productMeta'})
      }
      __.success(res, cart, 'cart successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async updateCartById(req, res) {
    try {
      const { params: { cartId }, body } = req
      validateCart(body)
      if (!body._id || (cartId != body._id)) {
        return __.send(res, 400, 'Please send an cart id to update')
      }
      const product = await ProductModel.findOne({ _id: body.product })
      body.totalPrice = util.changeToPaisa(product.discountPrice * body.quantity)
      body.isDeleted = false
      const condition = {
        _id: cartId,
        isDeleted: false
      }
      const cart = await CartModel.findOneAndUpdate(condition, body, { new: true })
      // .populate('productMeta')
      __.success(res, cart, 'cart successfully updated')
    } catch (error) {
      __.error(res, error)
    }
  }

  async deleteCartById(req, res) {
    try {
      const { params: { cartId }, user, franchise } = req
      if (!objectId.isValid(cartId)) {
        return __.send(res, 400, 'Please send cart id to delete')
      }
      let cart = await CartModel.findOne({ _id: cartId, isDeleted: false, franchiseId: franchise._id })
      if(!cart) {
        return __.send(res, 404, 'cart not found')
      }
      const condition = {
        _id: cartId,
        isDeleted: false,
        franchiseId: franchise._id
      }
      cart.isDeleted = true
      cart.deletedAt = new Date()
      cart.deletedBy = user
      cart = await CartModel.findOneAndUpdate(condition, cart, { new: true })
      __.success(res, cart, 'cart successfully deleted')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getCartById(req, res) {
    try {
      const { params: { cartId }, franchise } = req
      if(!(cartId || objectId.isValid(cartId))) {
        __.send(res, 400, 'Please send cart id')
      }
      const cart = await CartModel.findOne({
        _id: cartId,
        isDeleted: false,
        franchiseId: franchise._id
      })
      // .populate('productMeta')
      __.success(res, cart, 'cart successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getCartByUserId(req, res) {
    try {
      const { user, franchise } = req
      const cartObj = {
        isShippingFree: true,
        totalPrice: 0,
        deliveryCharge: 0
      }
      
      cartObj.carts = await CartModel.find({
        user: user._id,
        isDeleted: false,
        isBilled: false,
        franchiseId: franchise._id
      }).lean()
      // .populate('productMeta')
      _.each(cartObj.carts, (item)=> {
        cartObj.totalPrice += item.totalPrice
      })
      cartObj.price = cartObj.totalPrice
      if(cartObj.totalPrice < MinPurchaseToAvailShippingCost) {
        cartObj.isShippingFree = false
        cartObj.deliveryCharge = util.changeToPaisa(deliveryCharge)
        cartObj.totalPrice += util.changeToPaisa(deliveryCharge)
      }
      __.success(res, cartObj, 'Cart successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}

const obj = new Cart()
module.exports = obj
