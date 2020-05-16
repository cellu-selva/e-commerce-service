'use strict'

const jwt = require('jsonwebtoken')
const _ = require('lodash')
const config = require('config')

const __ = require('../../../helpers/response')
const Session = require('../../../models/session')
const User = require('../../../models/user')

const secretKey = config.get('tokenSecret')

const db = require('../../../helpers/db')
const getAuthToken = (req, type) => {
  let tokenString
  if (type === 'socket') {
    tokenString = _.get(req, 'token', null)
  } else {
    tokenString = _.get(req, 'x-pressato-auth', null)
  }
  if (!tokenString) {
    throw new Error('Authorization header is required')
  }
  if (tokenString.constructor !== String) {
    throw new Error('Authorization header must be a string')
  }
  let tokenStringArray = tokenString.split(' ')
  if (tokenStringArray.length !== 2) {
    throw new Error('Authorization header should be of format => x-pressato-auth: Bearer [token]')
  }
  if (tokenStringArray[0].toLowerCase() !== 'bearer') {
    throw new Error('Authorization header should be of format => x-pressato-auth: Bearer [token]')
  }
  return tokenStringArray[1]
}

const decodeAuthToken = (token) => {
  return jwt.verify(token, secretKey)
}

const getCurrentSession = async (token, decoded) => {
  let condition = {
    user: decoded.userId,
    token: token
  }
  let currentSession = await Session.findOne(condition)
  if (!currentSession) {
    throw new Error('Authentication error')
  }
  return currentSession
}
const getUser = async (userId) => {
  let condition = {
    _id: userId,
    isDeleted: false
  }
  // do not make this to lean
  let user = await User.findOne(condition)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

class AuthClass {
  generateAuthToken(userId, rememberMe) {
    let generatedOn = new Date()
    const expiresIn = rememberMe ? '30d' : '7d'
    let token = jwt.sign({ userId: userId.toString(), generatedOn }, secretKey, { expiresIn })
    return token
  }
  addTokenPrefix(token) {
    return config.get('tokenPrefix') + ' ' + token
  }
  async createSession(userId, rememberMe) {
    let token = this.generateAuthToken(userId, rememberMe)
    let inputs = {
      user: userId,
      token: token
    }
    let session = await Session.create(inputs)
    return session
  }
  async authenticate(req, res, next) {
    try {
      let token = getAuthToken(req.headers)
      let decoded = await decodeAuthToken(token)
      let session = await getCurrentSession(token, decoded)
      let user = await getUser(session.user)
      req.user = user
      req.currentSession = session
      next()
    } catch (error) {
      console.log(error)
      __.notAuthorized(res, 'Invalid Token')
    }
  }
  async deleteSession(req, res) {
    try {
      await Session.deleteOne({ _id: req.currentSession._id })
      __.send(res, 200, 'Successfully logged out')
    } catch (error) {
      __.error(res, error)
    }
  }
}

AuthClass = new AuthClass()
module.exports = AuthClass
