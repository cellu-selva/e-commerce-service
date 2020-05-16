'use strict'

const __ = require('../../../helpers/response')
const transactionModel = require('./../../../models/transaction')
const UserModel = require('./../../../models/user')
const rp = require('request-promise')
const CartModel = require('./../../../models/cart')
const _ = require('lodash')
const config = require('config')
const util = require('./../../../helpers/util')
function validateTransaction(transaction) {
  let error
  switch(true) {
    case (!(transaction && transaction.paymentId)):
      error = new Error('Please provide paymentId')
      break
    case (!(transaction && transaction.gateway)):
      error = new Error('Please provide gateway')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
}

class Transaction {
  async createTransaction(req, res, next) {
    try {
      const MinPurchaseToAvailShippingCost = util.changeToPaisa(250)
      const { body, user } = req
      const cartObj = {
        isShippingFree: true,
        totalPrice: 0,
        deliveryCharge: 0
      }
      
      cartObj.carts = await CartModel.find({
        user: user._id,
        isDeleted: false,
        isBilled: false
      })
      _.each(cartObj.carts, (item)=> {
        cartObj.totalPrice += item.totalPrice
      })
      if(cartObj.totalPrice < MinPurchaseToAvailShippingCost) {
        cartObj.totalPrice += util.changeToPaisa(30)
      }
      const { trans } = body
      validateTransaction(trans)
      const { paymentId } = trans
      // need to capture the payment information
      // try {
      //   const razor = config.get('razor')
      //   // capturing payment
      //   const paymentInfo = await rp({
      //     method: 'POST',
      //     url: `https://${razor.client}:${razor.secret}@api.razorpay.com/v1/payments/${paymentId}/capture`,
      //     form: {
      //       amount: util.changeToPaisa(cartObj.totalPrice)
      //     }
      //   })

      //   trans.razorData = paymentInfo
      //   // fetch payment info
      //   // const paymentInfo = await rp(`https://${razor.client}:${razor.secret}@api.razorpay.com/v1/payments/${paymentId}`)
      //   // trans.razorData = paymentInfo
      // } catch (error) {
      //   console.log('Error while fetching payment detail from razor pay ::: ', error)
      // }
      trans.userId = user._id
      let transaction = new transactionModel(trans)
      transaction = await transaction.save()
      if(transaction.isSuccess) {
        req.transaction = transaction
        next()
      } else {
        __.success(res, transaction, 'transaction successfully created')
      }
    } catch (error) {
      __.error(res, error)
    }
  }

  async updateTransaction(req, res) {
    try {
      let { transaction, order, user } = req
      validateTransaction(transaction)
      transaction.userId = user._id
      transaction.orderId = order._id
      transaction = await transactionModel.findOneAndUpdate({
        _id: transaction._id
      }, transaction, {
        new: true
      })
      __.success(res, transaction, 'transaction successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getTransactionById(req, res) {
    try {
      const { params: { transactionID } } = req
      if(!transactionID) {
        __.send(res, 400, 'Please send transaction id')
      }
      const transaction = await transactionModel.findOne({
        _id: transactionID,
        isDeleted: false
      })
      __.success(res, transaction, 'Transaction successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getTransactionByUser(req, res) {
    try {
      const { user } = req
      const transaction = await transactionModel.findOne({
        _id: user._id,
        isDeleted: false
      })
      __.success(res, transaction, 'Transaction successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}


const obj = new Transaction()
module.exports = obj
