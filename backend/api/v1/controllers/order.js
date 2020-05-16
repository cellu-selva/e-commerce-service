'use strict'

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const _ = require('lodash')
const __ = require('../../../helpers/response')
const OrderModel = require('../../../models/order')
const CartModel = require('../../../models/cart')
const config = require('config')
const queue = require('./../../../helpers/queue')
const util = require('./../../../helpers/util')
const constant = require('./../../../constants/common')
const {
  orderTypes,
  modesOfPayment,
  modesOfPurchase
} = constant
const checkIfOrdersAreValid = function(cartIDs) {
  let error = false
  _.each(cartIDs, (cartId)=> {
    if(!objectId.isValid(cartId)) {
      error = true
    }
  })
  return error
}
const validateOrder = (data) => {
  let error
  switch (true) {
    case (!(data && data.address && objectId.isValid(data.address))):
      error = new Error('Please provide address')
      break
    case (!(data && data.cartIds && !checkIfOrdersAreValid(data.cartIds))):
      error = new Error('Please provide cart Ids')
      break
    case (!(data && orderTypes.includes(data.orderType))):
      error = new Error('Please provide cart Ids')
      break
    case (!(data && modesOfPurchase.includes(data.modeOfPurchase))):
      error = new Error('Please provide cart Ids')
      break
    case (!(data && modesOfPayment.includes(data.modeOfPayment))):
      error = new Error('Please provide cart Ids')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}

const calculatePrice = function(items) {
  let totalPrice = 0
  _.each(items, (item) => {
    totalPrice += item.totalPrice
  })
  return util.changeToPaisa(totalPrice)
}

const sendAlertMailForOrders = function(order, mailOption) {
  const to = config.get('alertEmail')
  _.each(to, (email) => {
    mailOption.to = email
    mailOption.html += config.get('protocol')+"://"+ config.get('host') + ":" + config.get('clientPort') +"/orders/"+ order._id
    queue.createJob('sendMail', mailOptions)
  })
}
class Order {
  async createOrder(req, res, next) {
    try {
      const { body, user, franchise } = req
      const { orderObj } = body
      validateOrder(orderObj)
      
      const cartItems = await CartModel.find({
        _id: {
          $in: orderObj.cartIds
        }, isDeleted: false,
        franchiseId: franchise._id
      })
      if(!cartItems.length) {
        return __.send(res, 400, 'cart Items not found')
      }
      orderObj.totalPrice = calculatePrice(cartItems)
      let order = new OrderModel(orderObj)
      order.user = user._id
      order.isDeleted = false
      order.status = "queued"
      order.franchiseId = franchise._id
      order = await order.save()
      await CartModel.update({ _id: {
        $in : orderObj.cartIds
      }, isDeleted: false,
      franchiseId: franchise._id
     }, {
        $set: {
          orderId: order._id
        }
      }, {
        multi: true
      })
      let mailOptions = {
        to: user.email,
        subject: `Order placed - #${order._id}`,
        html: 'Hi, You\'re order has been placed successfully <br>. Click on the link below to check your order.<br/><br/><br/><br/> '
      }
      mailOptions.html += "http://"+ config.get('host') + ":" + config.get('clientPort') +"/my-orders"
      queue.createJob('sendMail', mailOptions)
      sendAlertMailForOrders(order, mailOptions)
      req.order = order
      next()
    } catch (error) {
      __.error(res, error)
    }
  }

  async getOrderById(req, res) {
    try {
      const { params: { orderId }, franchise } = req
      if(!(orderId || objectId.isValid(orderId))) {
        __.send(res, 400, 'Please send order id')
      }
      const order = await OrderModel.findOne({
        _id: orderId,
        isDeleted: false,
        franchiseId: franchise._id
      })
      __.success(res, order, 'order successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getOrderByUserId(req, res) {
    try {
      const { user, franchise } = req
      // if(!(userId || objectId.isValid(userId))) {
      //   __.send(res, 400, 'Please send user id')
      // }
      
      const orders = await OrderModel.find({
        user: user._id,
        isDeleted: false,
        franchiseId: franchise._id
      }).populate('address cartIds')
      __.success(res, orders, 'Orders successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getAllOrders(req, res) {
    try {
      const { params, franchise } = req
      const { page, limit } = params
      const count = await OrderModel.count({
        franchiseId: franchise._id
      })
      const orders = await OrderModel.find({
        franchiseId: franchise._id
      }).populate('user address').sort('-createdAt').limit(limit).skip(page*limit)
      __.success(res, { orders, count }, 'Orders successfully fetched')
    } catch (error) {
      console.log(`Error while fetching orders...`, error)
      __.error(res, error)
    }
  }
}


const obj = new Order()
module.exports = obj
