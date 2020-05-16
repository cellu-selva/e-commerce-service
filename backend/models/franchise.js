const mongoose = require('mongoose')
const Schema = mongoose.Schema

const franchiseSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  isDeleted: {
      type: Boolean,
      default: false
  },
  storeLocation: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  deletedAt: {
    type: Date,
    required: false
  }

}, { timestamps: true })

const franchiseUsModel = mongoose.model('Franchise', franchiseSchema)
module.exports = franchiseUsModel
