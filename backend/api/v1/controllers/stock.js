const Category = require('./../../../models/category')
const __ = require('../../../helpers/response')

function validateStock(data) {
  let error
  switch(true) {
    case (!data.name): 
    error = new Error("Product name cannot be empty")
    break
  case (!data.code): 
    error = new Error("Product code cannot be empty")
    break
  case (!data.description): 
    error = new Error("Product description cannot be empty")
    break
  case (!data.logo): 
    error = new Error("Product img url cannot be empty")
    break
  }
  if(error) {
    error.status = 400
    throw error
  }
  return
}
