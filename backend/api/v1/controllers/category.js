const Category = require('./../../../models/category')
const __ = require('../../../helpers/response')

function validateCategory(data) {
  let error
  switch(true) {
    case (!data.name): 
    error = new Error("category name cannot be empty")
    break
  case (!data.code): 
    error = new Error("category code cannot be empty")
    break
  case (!data.description): 
    error = new Error("category description cannot be empty")
    break
  case (!data.logo): 
    error = new Error("category img url cannot be empty")
    break
  case (!data.icon): 
    error = new Error("category icon cannot be empty")
    break
  }
  if(error) {
    error.status = 400
    throw error
  }
  return
}
class CategoryController {
  
  async createCategory(req, res) {
    try {
      const { body, user } = req
      validateCategory(body)
      body.createdBy = user
      let category = Category(body)
      category = await category.save()
      return __.success(res, category, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getAllCategory(req, res) {
    try {
      const categories = await Category.find({
        isDeleted: false
      })
      return __.success(res, categories, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async getCategoryById(req, res) {
    try {
      const { params: { categoryId } } = req
      if(!categoryId) {
        return __.send(res, 400, `Please enter a category id`)
      }
      const category = await Category.findOne({
        _id: categoryId,
        isDeleted: false
      })
      if(!category) {
        return __.notFound(res, `category ${categoryId} not found`)
      }
      return __.success(res, category, '')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async deleteCategoryById(req, res) {
    try {
      const { params: { categoryId } } = req
      if(!categoryId) {
        return __.send(res, 400, `Please enter a category ID`)
      }
      let condition = {
        _id: params.categoryId,
        isDeleted: false,
      }
      let update = {
        isDeleted: true,
        deletedOn: new Date(),
        deletedBy: req.user
      }
      const category = await Category.findOneAndUpdate(condition, update, { new: true })
      if(!category) {
        return __.notFound(res, `category ${categoryId} not found`)
      }
      return __.success(res, category, 'category deleted successfully')
    } catch (error) {
      return __.error(res, error)
    }
  }
  async updateCategoryById(req, res) {
    try {
      const { body, params: { categoryId } } = req
      if(!categoryId) {
        return __.send(res, 400, `Please enter a category ID`)
      }
      let condition = {
        _id: params.categoryId,
        isDeleted: false,
      }
      let update = body
      const category = await Category.findOneAndUpdate(condition, update, { new: true })
      if(!category) {
        return __.notFound(res, `Category ${categoryId} not found`)
      }
      return __.success(res, category, 'CAtegory deleted successfully')
    } catch (error) {
      return __.error(res, error)
    }
  }
}

const obj = new CategoryController()
module.exports = obj
