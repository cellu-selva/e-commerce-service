'use strict'

const nodemailer = require('nodemailer')
const config = require('config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
})

class EmailClass {
    async sendMail(mailOptions) {
        try {
            mailOptions.from = config.get('mail').email
            let info = await transporter.sendMail(mailOptions)

            console.log('Message sent: ', info.messageId)
            console.log('successfully delivered to ' + mailOptions.to)
        } catch (error) {
            console.log('Mail not sent ' + error)
        }
    }
}

EmailClass = new EmailClass()
module.exports = EmailClass
