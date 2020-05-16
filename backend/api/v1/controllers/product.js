const Product = require('./../../../models/product')
const __ = require('../../../helpers/response')
const _ = require('lodash')
function validateProduct(data) {
let error;
switch(true) {
  case (!data.name): 
    error = new Error("Product name cannot be empty")
    break
  case (!data.code): 
    error = new Error("Product code cannot be empty")
    break
  case (data.actualPrice <= 0): 
    error = new Error("Product actual price cannot be empty")
    break
  case (data.discountPrice < 0):
    error = new Error("Product discount price cannot be empty")
    break
  case (!data.description): 
    error = new Error("Product description cannot be empty")
    break
  case (!data.shortDescription): 
    error = new Error("Product short description cannot be empty")
    break
  case (!data.logo): 
    error = new Error("Product img thumnail url cannot be empty")
    break
  case (!data.detailedLogo): 
    error = new Error("Product img url cannot be empty")
    break
  case (!data.measuringUnit): 
    error = new Error("Product measuring unit cannot be empty")
    break
  case (data.wastagePercentage <= 0):
    error = new Error("Product wastage percentage cannot be empty")
    break
  case (!data.nutrient): 
    error = new Error("Product nutrient cannot be empty")
    break
  case (!data.categoryId): 
    error = new Error("Product category cannot be empty")
    break
  }
  if(error) {
    error.status = 400
    throw error
  }
  return
}

class ProductController {
  async createProduct(req, res) {
    try {
      const { body, user } = req
      validateProduct(body)
      body.createdBy = user
      let product = Product(body)
      product = await product.save()
      return __.success(res, product, 'Product created successfully')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getAllProducts(req, res) {
    try {
      const products = await Product.find({
        isDeleted: false
      }).lean()
      return __.success(res, products, 'Successfully fetched products')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getProductById(req, res) {
    try {
      const { params: { productId } } = req
      if(!productId) {
        return __.send(res, 400, `Please enter a product id`)
      }
      const product = await Product.findOne({
        _id: productId,
        isDeleted: false
      }).lean()
      if(!product) {
        return __.notFound(res, `Product ${productId} not found`)
      }
      return __.success(res, product, 'Successfully fetch product by product id')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getProductByCategoryId(req, res) {
    try {
      const { params: { categoryId } } = req
      if(!categoryId) {
        return __.send(res, 400, `Please enter a product category ID`)
      }
      const products = await Product.find({
        category: categoryId,
        isDeleted: false
      }).lean()
      return __.success(res, products, 'successfully fetched products by category id')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async deleteProductById(req, res) {
    try {
      const { params: { productId } } = req
      if(!productId) {
        return __.send(res, 400, `Please enter a product ID`)
      }
      let condition = {
        _id: productId,
        isDeleted: false,
      }
      let update = {
        isDeleted: true,
        deletedOn: new Date(),
        deletedBy: req.user
      }
      const product = await Product.findOneAndUpdate(condition, update, { new: true })
      if(!product) {
        return __.notFound(res, `Product ${productId} not found`)
      }
      return __.success(res, product, 'Product deleted successfully')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async updateProductById(req, res) {
    try {
      const { body, params: { productId } } = req
      if(!productId) {
        return __.send(res, 400, `Please enter a product ID`)
      }
      let condition = {
        _id: productId,
        isDeleted: false,
      }
      const existingProduct =await Product.findOne({
        _id: productId,
        isDeleted: false
      })
      let update = {} 
      if(!existingProduct) {
        return __.notFound(res, `Product not found`)
      }
      Object.assign({ update, body, existingProduct })
      validateProduct(update)
      const product = await Product.findOneAndUpdate(condition, update, { new: true }).lean()
      if(!product) {
        return __.notFound(res, `Product ${productId} not found`)
      }
      return __.success(res, product, 'Product deleted successfully')
    } catch (error) {
      return __.error(res, error)
    }
  }

  async getRelatedProducts(req, res) {
    try {
      const { params: { categoryId, productId } } = req
      if(!categoryId) {
        return __.send(res, 400, `Please enter a product category ID`)
      }
      const products = await Product.find({
        category: categoryId,
        isDeleted: false,
        product: {$ne: productId}
      }).limit(4).lean()
      const product = _.filter(products, (prod)=> {
        return prod._id != productId
      })
      return __.success(res, product, '')
    } catch (error) {
      __.error(res, error)
    }
  }
}

const obj = new ProductController()
module.exports = obj
