const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = Schema({
    quantity: {
      type: Number,
      required: true
    },
    orderId: {
      type: Schema.Types.ObjectId
    },
    totalPrice: {
      type: Number,
      required: true
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
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required:true
    },
    franchiseId: {
        type: Schema.Types.ObjectId,
        ref: 'Franchise'
    }

}, { timestamps: true })

const CartModel = mongoose.model('Cart', CartSchema)
module.exports = CartModel
