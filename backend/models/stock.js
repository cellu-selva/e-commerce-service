const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    franchiseId: {
        type: Schema.Types.ObjectId,
        ref: 'Franchise'
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerUnit: {
      type: Number,
      required: true
    }

}, { timestamps: true })

const stockSummaryModel = mongoose.model('StockSummary', stockSchema)
module.exports = stockSummaryModel
