const express = require('express')
const app = express.Router()
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const franchiseController = require('../controllers/franchise')

app.post('/franchise', auth.authenticate, admin.isAdmin, franchiseController.createfranchise)
app.get('/franchise', auth.authenticate, admin.isAdmin, franchiseController.getAllFranchise)
app.get('/franchise/:franchiseId', auth.authenticate, franchiseController.getFranchiseById)
app.put('/franchise/:franchiseId', auth.authenticate, admin.isAdmin, franchiseController.updatefranchiseById)
app.delete('/franchise/:franchiseId', auth.authenticate, admin.isAdmin, franchiseController.deletefranchiseById)

module.exports = app
