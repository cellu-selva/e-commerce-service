const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    actualPrice: {
      type: Number,
      required: true
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    code: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true
    },
    logo: {
      type: String,
      required: true,
      trim: true
    },
    detailedLogo: {
      type: String,
      required: true,
      trim: true
    },
    measuringUnit: {
      type: String,
      required: true,
      trim: true,
      enum: ['grams', 'kg', 'ml', 'ltr', 'packet']
    },
    wastagePercentage: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
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

const ProductModel = mongoose.model('Product', ProductSchema)
module.exports = ProductModel
