'use strict'

const kue = require('kue')
const config = require('config')
const webhook = require('./../workers/webhook')
const env = process.env.NODE_ENV

const defaultOptions = {
  attempts: 5,
  priority: 'normal',
  backoff: 'fixed',
  delay: 5000,
  ttl: 10 * 60 * 1000
}
class Queue {
  constructor() {
    this.queue = kue.createQueue({
      prefix: config.prefixKey,
      redis: {
        port: 6379,
        host: '127.0.0.1'
      }
    })
    this.jobs = []
  }

  createJob(name, payload, options, callback) {
    if(env === 'test') {
      if(callback) {
        callback()
      }
      return
    }
    const job = this.queue.create(name, payload)
    options = {...defaultOptions, ...options}
    job.attempts(options.attempts)
       .priority(options.priority)
       .backoff({delay: options.delay, type: options.backoff})
       .removeOnComplete((process.env.NODE_ENV === 'production'))
       .delay(options.startAfter)
       .ttl(options.ttl)
       .save((err) => {
          if(err) {
            console.log(new Date() + ' Failed to enqueue ' + name, err)
          } else {
            console.log(new Date() + ' Successfully enqueued ' + name)
          }
          // this.startProcessIfNew(name)
        if (!callback) {
          return
        }
        callback(err)
      })
  }
}
module.exports = new Queue()
