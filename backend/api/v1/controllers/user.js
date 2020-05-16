'use strict'

const config = require('config')

const User = require('../../../models/user')
const Auth = require('../middlewares/auth')

const __ = require('../../../helpers/response')
const queue = require('../../../helpers/queue')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegexp = /^\d{10}$/

const validateUser = (data) => {
  let error
  switch (true) {
    case (!(data.password && data.password.constructor === String && (data.password = data.password.trim()))):
      error = new Error('Please provide password')
      break
    case (!emailRegexp.test(data.email = data.email.trim())):
      error = new Error('Please enter a valid email')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}

const validateUserObject = (data) => {
  let error
  switch (true) {
    case (data && !emailRegexp.test(data.email = data.email.trim())):
      error = new Error('Please enter a valid email')
      break
    case (data && !phoneRegexp.test(data.phoneNumber = data.phoneNumber.trim())):
      error = new Error('Please enter a valid phone number')
      break
    case (!(data.name && data.name.constructor === String && (data.name = data.name.trim()))):
      error = new Error('Please provide your name')
      break
    case (!(data.password && data.password.constructor === String && (data.password = data.password.trim()))):
      error = new Error('Please provide password')
      break
    case (!emailRegexp.test(data.email = data.email.trim())):
      error = new Error('Please enter a valid email')
      break
    case (data.password.length < 8):
      error = new Error('Password should have atleast 8 characters')
      break
    default:
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
}

const validateChangePassword = function(credentials) {
  const { newPassword, confirmNewPassword } = credentials
  return newPassword && confirmNewPassword && newPassword === confirmNewPassword
}

class UserController {
  async checkMailExists(email) {
    let error
    email = email.trim().toLowerCase()
    let condition = {
      email,
      isDeleted: false
    }
    return await User.findOne(condition).lean()
  }
  async loginHandler(req, res) {
    try {
      const { body } = req
      validateUser(body)
      let condition = {
        email: body.email.trim().toLowerCase(),
        isDeleted: false,
        isSelfRegistered: true
      }
      let user = await User.findOne(condition)
      if (!user) {
        return __.send(res, 400, 'email address not registered')
      }
      if (!user.isVerified) {
        return __.forbidden(res, 'Go to your mail and verify your user account')
      }
      let verify = user.verifyPassword(body.password)
      if (!verify) {
        return __.send(res, 401, 'Wrong Password')
      }
      user.lastLoggedIn = new Date()
      let session = await Auth.createSession(user._id, body.rememberme)
      let token = await Auth.addTokenPrefix(session.token)
      __.success(res, { authToken: token }, 'Successfully logged in')
    } catch (error) {
      __.error(res, error)
    }
  }
  async createUserHandler(req, res) {
    try {
      const { body, user } = req
      if ((user.userType !== 'superAdmin' || user.userType !== 'tenantAdmin')
          || (body.userType === 'tenantAdmin' && user.userType !== 'superAdmin')
          || (body.userType === 'superAdmin')) {
        return __.forbidden(res, 'Not authorized to perform this action')
      }
      body.isSelfRegistered = false
      let condition = {
        isDeleted: false
      }
      const email = body.email.trim().toLowerCase()
      const phoneNumber = body.phoneNumber.trim().toLowerCase()
      if (email) {
        condition.email = email
      }
      if (phone) {
        condition.phoneNumber = phoneNumber
      }
      let user = await User.findOne(condition)
      if (user) {
        return __.send(res, 409, 'This email address is already in use')
      }
      user = new User({
        name: body.name.trim(),
        isSelfRegistered: body.isSelfRegistered,
        ...condition
      })
      user.password = await user.generateHash(body.password || 'test1234')
      const name = `${user.firstName} ${user.lastName}`
      user.verificationToken = Auth.generateAuthToken(user._id)
      await user.save()
      if (user.userType !== 'customer' || user.userType !== 'deliveryAgent') {
        let mailOptions = {
          to: user.email,
          subject: 'Welcome',
          html: 'Welcome, You\'re invited by ' + name + '. Click on the link below to activate your account.<br/><br/><br/><br/> '
        }
        mailOptions.html += config.get('url') + '/v1/users/' + user.verificationToken + '/confirm'
        queue.createJob('sendMail', mailOptions)
      }
      let userData = {
        _id: user._id,
        name: name,
        email: user.email,
        isActive: user.isActive,
        invitationStatus: user.invitationStatus
      }
      __.success(res, { user: userData }, 'User successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async editUserHandler(req, res) {
    try {
      const { body, params } = req
      const bodyClone = JSON.stringify(JSON.parse(body))
      if (!params.id || params.id.constructor !== String) {
        return __.send(res, 400, 'Please pass id')
      }
      let condition = {
        _id: params.id,
        isDeleted: false,
      }
      let user = await User.findOne(condition)
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      const verify = user.verifyPassword(bodyClone.password)
      if (!verify) {
        return __.send(res, 401, 'Wrong Password')
      }
      bodyClone = Object.assign({}, user, bodyClone)
      validateUserObject(bodyClone)
      delete bodyClone.password
      user = await User.findOneAndUpdate(condition, bodyClone, { new: true }).lean()
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      let userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isActive: user.isActive,
        invitationStatus: user.invitationStatus
      }
      __.success(res, userData, 'User successfully updated')
    } catch (error) {
      console.log(error)
      __.error(res, error)
    }
  }
  async updatePasswordHandler(req, res) {
    try {
      const { params, body } = req
      if (!params.id || params.id.constructor !== String) {
        return __.send(res, 400, 'Please pass id')
      }
      let type = 'updatePassword'
      if (!validateChangePassword(body)) {
        return __.send(res, 400, 'new password and confirm password mismatch')
      }
      validateNonAdmin(body, type)
      let condition = {
        _id: params.id,
        isDeleted: false,
      }
      let user = await User.findOne(condition)
      const verify = user.verifyPassword(body.password)
      if(!verify) {
        return __.send(res, 401, 'Wrong Password')
      }
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      user.password = await user.generateHash(body.newPassword)
      await user.save()
      __.send(res, 200, 'User successfully updated the password at ')
    } catch (error) {
      __.error(res, error)
    }
  }
  async deleteUserHandler(req, res) {
    try {
      const { params, user } = req
      if (!params.id || params.id.constructor !== String) {
        return __.send(res, 400, 'Please pass id')
      }
      if (user._id !== params.id && user.userType !== 'superAdmin') {
        return __.forbidden(res, 'Not autorized to delete other account')
      }
      let condition = {
        _id: params.id,
        isDeleted: false,
      }
      let update = {
        isDeleted: true,
        deletedOn: new Date()
      }
      let user = await User.findOneAndUpdate(condition, update)
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      __.send(res, 200, 'User successfully deleted')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getUsersHandler(req, res) {
    try {
      let selectCondition = 'email phoneNumber phoneNumberExt name invitationStatus invitedBy isDeleted'
      let users = await User.find({ isDeleted: false }).sort({ createdAt: -1 }).select(selectCondition).populate('addresses.primary addresses.secondary')
      __.success(res, users)
    } catch (error) {
      __.error(res, error)
    }
  }
  async confirmInvitationHandler(req, res) {
    try {
      const { params } = req
      if (!params || !params.token || !params.token.trim()) {
        return __.send(res, 400, 'Invalid Link')
      }
      let condtion = {
        verificationToken: params.token.trim(),
        isDeleted: false
      }
      let user = await User.findOne(condtion)
      if (!user) {
        return __.notFound(res, 'Invalid token')
      } else if (user.invitationStatus === 'registered') {
        return __.notFound(res, 'Account is already activated')
      }
      user.invitationStatus = 'registered'
      user.isVerified = true
      user.verifiedOn = new Date()
      user.lastLoggedIn = new Date()
      await user.save()

      let session = await Auth.createSession(user._id)
      let token = await Auth.addTokenPrefix(session.token)
      // __.success(res, { authToken: token }, 'User verified')
      res.redirect(`http://${config.get("host")}:${config.get("clientPort")}`)
    } catch (error) {
      __.error(res, error)
    }
  }
  async currentUserHandler(req, res) {
    try {
      let user = await User.findOne({ _id: req.user._id, isDeleted: false, isVerified: true }).
        select('email phoneNumber phoneNumberExt firstName lastName account ').
        lean()
      if (!user) {
        return __.notFound(res, 'No user found')
      }
      return __.success(res, user)
    } catch (error) {
      __.error(res, error)
    }
  }
  async signUpHandler(req, res) {
    try {
      const { body }= req
      validateUserObject(body)
      const email = body.email.toLowerCase()
      const phoneNumber = body.phoneNumber.toLowerCase()
      const existingUser = await this.checkMailExists(email)
      let user = {
        isSelfRegistered: true,
        userType: 'customer'
      }
      if (existingUser) {
        if (existingUser.isSelfRegistered) {
          error = new Error('Email taken. Please try a different email')
          error.status = 409
          throw error
        } else {
          Object.assign(user, existingUser, body)
        }
      } else {
        user = new User({
          email,
          phoneNumber,
          name: body.name.trim()
        })
      }
      user.password = await user.generateHash(body.password)
      user.verificationToken = Auth.generateAuthToken(user._id)
      await user.save()
      let mailOptions = {
        to: user.email,
        subject: 'Welcome',
        html: 'Welcome, glad you\'re here. Click on the link below to activate your account.<br/><br/><br/><br/> '
      }
      mailOptions.html += config.get('url') + '/v1/users/' + user.verificationToken + '/verify'
      queue.createJob('sendMail', mailOptions)
      __.send(res, 200, 'Successfully signed up. Please check your mail for verification link')
    } catch (error) {
      __.error(res, error)
    }
  }
  async verifyAccountHandler(req, res) {
    try {
      const { params } = req
      if (!params || !params.token || !(params.token = params.token.trim())) {
        return __.send(res, 400, 'Invalid Link')
      }
      const condtion = {
        verificationToken: params.token,
        isAdmin: true,
        isDeleted: false
      }
      const user = await User.findOne(condtion)
      if (!user) {
        return __.notFound(res, 'Invalid token')
      } else if (user.isVerified) {
        return __.notFound(res, 'Account is already activated')
      }
      const verifiedTime = new Date()
      user.isVerified = true
      user.verifiedOn = verifiedTime
      user.lastLoggedIn = verifiedTime
      await user.save()
      const session = await Auth.createSession(user._id)
      const token = await Auth.addTokenPrefix(session.token)
      __.success(res, { authToken: token }, 'User Account verified')
    } catch (error) {
      __.error(res, error)
    }
  }
}

UserController = new UserController()
module.exports = UserController
