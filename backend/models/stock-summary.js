const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSummarySchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    stockLeft: {
        type: Number,
        required: true
    },
    franchiseId: {
        type: Schema.Types.ObjectId,
        ref: 'Franchise'
    },
    stockAvailable: {
        type: Number,
        required: true
    },
    stockPurchased: {
        type: Number,
        required: true
    },
    stockPurchasedValue: {
        type: Number,
        required: true
    },
    stockSalesValue: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const stockSummaryModel = mongoose.model('StockSummary', stockSummarySchema)
module.exports = stockSummaryModel
