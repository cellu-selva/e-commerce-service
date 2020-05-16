const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const emailValidator = [emailRegexp, 'Invalid Email']


const contactUsSchema = Schema({
  email: {
    type: String,
    required: 'Email is required',
    trim: true,
    lowercase: true,
    match: emailValidator
  },
  phoneNumber: {
    type: String
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true })

const contactUsModel = mongoose.model('ContactUs', contactUsSchema)
module.exports = contactUsModel
