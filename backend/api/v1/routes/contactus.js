const express = require('express')
const app = express.Router()
const couponController = require('../controllers/contactus')

app.post('/contactus', couponController.create)
module.exports = app
