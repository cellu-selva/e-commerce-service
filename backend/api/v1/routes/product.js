const express = require('express')
const app = express.Router()
const admin = require('./../middlewares/admin')
const auth = require('./../middlewares/auth')
const productController = require('./../controllers/product')

app.post('/products', auth.authenticate, admin.isAdmin, productController.createProduct)
app.get('/products', productController.getAllProducts)
app.get('/products/:productId', productController.getProductById)
app.put('/products/:productId', auth.authenticate, admin.isAdmin, productController.updateProductById)
app.delete('/products/:productId', auth.authenticate, admin.isAdmin, productController.deleteProductById)
app.get('/products/category/:categoryId', productController.getProductByCategoryId)
app.get('/products/category/:categoryId/product/:productId', productController.getRelatedProducts)
module.exports = app
