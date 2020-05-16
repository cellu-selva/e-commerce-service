const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constant = require('./../constants/common')
const { 
  status,
  orderTypes,
  modesOfPayment,
  modesOfPurchase
} = constant

const OrderSchema = Schema({
    totalPrice: {
      type: Number,
      required: true
    },
    cartIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    }],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true
    },
    transcationId: {
      type: Schema.Types.ObjectId,
      ref: 'Transcation',
      required: true
    },
    couponId: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon'
    },
    additionalNote: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required:true
    },
    orderType: {
      type: String,
      required: true,
      enum: orderTypes
    },
    status: {
      type: String,
      required: true,
      enum: status
    },
    deliveryAgent: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    modeOfPayment: {
      type: String,
      required: true,
      enum: modesOfPayment
    },
    modeOfPurchase: {
      type: String,
      required: true,
      enum: modesOfPurchase
    },
    franchiseId: {
        type: Schema.Types.ObjectId,
        ref: 'Franchise'
    }

}, { timestamps: true })

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel
