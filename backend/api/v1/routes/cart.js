const express = require('express')
const app = express.Router()
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const cartController = require('./../controllers/cart')

app.post('/cart', auth.authenticate, cartController.createCart)
app.get('/cart/user', auth.authenticate, cartController.getCartByUserId)
app.get('/cart/:cartId', auth.authenticate, cartController.getCartById)

app.put('/cart/:cartId', auth.authenticate, cartController.updateCartById)
app.delete('/cart/:cartId', auth.authenticate, cartController.deleteCartById)

module.exports = app
