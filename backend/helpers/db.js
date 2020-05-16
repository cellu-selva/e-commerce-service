'use strict'

const config = require('config')
const mongoose = require('mongoose')
const mongodbURL = config.get('db')
const Promise = require('bluebird')
const redis = require('redis')

mongoose.Promise = Promise

class DatabaseClass {
  connectMongo() {
    try {
      if (this.connection) {
        return
      }
      this.connection = mongoose.connect(mongodbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }).then(() => {
        console.log('Mongo DB connection successful')
      })
    } catch (error) {
      console.error('Failed to connect to MongoDB. Error:', error)
    }
  }
  redisClient() {
    return Promise.promisifyAll(redis.createClient(config.get('redis').port, config.get('redis').host))
  }
}
const databaseHelper = new DatabaseClass()
module.exports = databaseHelper
