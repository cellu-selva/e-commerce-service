const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
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
    logo: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      trim: true
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

const CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel
