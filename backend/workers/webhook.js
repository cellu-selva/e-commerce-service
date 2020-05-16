const EmailHelper = require('../helpers/email')

class WebhookController {
  async sendMail(mailOptions, done) {
    await EmailHelper.sendMail(mailOptions)
    return done()
  }
}
WebhookController = new WebhookController()
module.exports = WebhookController
