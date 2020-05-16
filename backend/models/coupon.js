const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CouponSchema = Schema({
  coupon: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  maxDiscount: {
    type: Number,
    required: true
  },
  minPurchaseValue: {
    type: Number,
    required: true
  },
  noOfRedeem: {
    type: Number,
    required: true
  },
  totalReddemSoFar: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  categoryIds: {
    type: [Schema.Types.ObjectId],
  },
  productIds: {
    type: [Schema.Types.ObjectId],
  },
  isNewUserCoupon: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }

}, { timestamps: true })

const CouponModel = mongoose.model('Coupon', CouponSchema)
module.exports = CouponModel
