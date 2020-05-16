const express = require('express')
const app = express.Router()
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const orderController = require('./../controllers/order')
const transactionController = require('./../controllers/transaction')

app.get('/order/all', orderController.getAllOrders)
app.post('/order', auth.authenticate, transactionController.createTransaction,
  orderController.createOrder, transactionController.updateTransaction)
app.get('/order/user', auth.authenticate, orderController.getOrderByUserId)
app.get('/order/:orderId', auth.authenticate, orderController.getOrderById)

// app.get('/order/user/:userId', auth.authenticate, orderController.getOrderByUserId)
// app.put('/order/:orderId', auth.authenticate, orderController.updateOrderById)
// app.delete('/order/:orderId', auth.authenticate, orderController.deleteOrderById)

module.exports = app
