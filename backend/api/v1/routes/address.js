const express = require('express')
const app = express.Router()
const admin = require('./../middlewares/admin')
const auth = require('./../middlewares/auth')
const addressController = require('./../controllers/address')

app.post('/address', auth.authenticate, addressController.createAddress)
app.get('/address/user', auth.authenticate, addressController.getAddressByUser)
app.get('/address/:addressId', auth.authenticate, addressController.getAddressById)
app.put('/address/:addressId', auth.authenticate, admin.isAdmin, addressController.updateAddressById)
app.delete('/address/:addressId', auth.authenticate, admin.isAdmin, addressController.deleteAddressById)

module.exports = app
