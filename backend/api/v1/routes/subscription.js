const express = require('express')
const app = express.Router()
const subscriptionController = require('../controllers/subscription')

app.post('/subscription', subscriptionController.create)
module.exports = app
