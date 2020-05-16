const ContactUsModel = require('./../../../models/contactus')
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
class ContactUs {
  async create(req, res) {
    try {
      const { body } = req
      validateMessage(body)
      let contactus = ContactUsModel(body)
      contactus = await contactus.save()
      let mailOptions = {
        to: body.email,
        subject: `Pressato - Support`,
        html: 'Hi, Thank you for reaching out to us. We would get back to you shortly'
      }
      queue.createJob('sendMail', mailOptions)
      __.success(res, contactus, 'Entry successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
}

module.exports = new ContactUs()
