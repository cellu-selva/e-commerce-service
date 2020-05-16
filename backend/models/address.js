const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = Schema({
    name: {
        type: String,
        required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    phoneExt: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String
    }

}, { timestamps: true })

const AddressModel = mongoose.model('Address', AddressSchema)
module.exports = AddressModel
