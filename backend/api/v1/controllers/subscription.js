const SubscriptionModel = require('./../../../models/subscription')
const __ = require('../../../helpers/response')
const queue = require('./../../../helpers/queue')
function validateMessage(data) {
  let error
  switch(true) {
    case(!(data && data.email)):
      error = new Error('Email is required')
      break
    case (!(data && data.name)): 
      error = new Error('name is required')
      break
  }
  if(error) {
    error.status = 400
    throw error
  }
}
class Subscription {
  async create(req, res) {
    try {
      const { body } = req
      validateMessage(body)
      let subscription = SubscriptionModel(body)
      subscription = await subscription.save()
      let mailOptions = {
        to: body.email,
        subject: `Pressato - subscription`,
        html: 'Hi, Thank you for subscribing to pressato. We would send you latest offers and new product'
      }
      queue.createJob('sendMail', mailOptions)
      __.success(res, subscription, 'Entry successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
}

module.exports = new Subscription()
