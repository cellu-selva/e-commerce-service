const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String
    },
    tokenExpiresOn: {
        type: Date
    },
    sessionFrom: {
        type: String,
        required: true,
        enum: ['web', 'mobile']
    },
    deviceType: {
        type: String,
        required: true,
        enum: ['ios', 'android', 'web']
    }
}, { timestamps: true })

const sessionModel = mongoose.model('Session', sessionSchema)
module.exports = sessionModel