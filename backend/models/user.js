const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const emailValidator = [emailRegexp, 'Invalid Email']


const UserSchema = Schema({
  userType: {
    type: 'String',
    enum: ['customer', 'employee', 'deliveryAgent', 'superAdmin', 'tenantAdmin']
  },
  isSelfRegistered: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    required: 'Email is required',
    trim: true,
    lowercase: true,
    unique: true,
    match: emailValidator
  },
  phoneNumber: {
    type: String,
    default: '',
    trim: true
  },
  phoneNumberExt: {
    type: String,
    default: '+91'
  },
  password: {
    type: String,
    required: true
  },
  passwordEncryptionType: {
    type: String,
    enum: ['bcrypt'],
    default: 'bcrypt'
  },
  name: {
    type: String,
    trim: true
  },
  verificationToken: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedOn: {
    type: Date
  },
  lastLoggedIn: {
    type: Date,
    default: new Date()
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedOn: {
    type: Date
  },
  addresses: {
    primary: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    secondary: [{
      type: Schema.Types.ObjectId,
      ref: 'Address'
    }] 
  }
}, { timestamps: true })

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//method to decrypt password
UserSchema.methods.verifyPassword = function (password) {
  let user = this
  if (!password || !user.password) {
    return false
  }
  return bcrypt.compareSync(password, user.password)
}

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel
