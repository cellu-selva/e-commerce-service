'use strict'
const kue = require('kue')
const queue = kue.createQueue({
  prefix: 'hfs-survey',
  redis: {
    port: 6379,
    host: '127.0.0.1'
  }
})
const db = require('../helpers/db')
db.connectMongo()

const webhook = require('./webhook')

queue.process('sendMail', function (job, done) {
  // done()
  webhook['sendMail'](job.data, done)
});
