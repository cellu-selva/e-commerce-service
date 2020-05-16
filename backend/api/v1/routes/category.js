const express = require('express')
const app = express.Router()
const admin = require('./../middlewares/admin')
const auth = require('./../middlewares/auth')
const categoryController = require('./../controllers/category')

app.post('/category', auth.authenticate, categoryController.createCategory)
app.get('/category', categoryController.getAllCategory)
app.get('/category/:categoryId', categoryController.getCategoryById)
app.put('/category/:categoryId', auth.authenticate, admin.isAdmin, categoryController.updateCategoryById)
app.delete('/category/:categoryId', auth.authenticate, admin.isAdmin, categoryController.deleteCategoryById)

module.exports = app
