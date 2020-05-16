const Category = require('./../../../models/franchise')
const __ = require('../../../helpers/response')

function validateFranchise(data) {
  let error
  switch(true) {
    case (!data.name): 
    error = new Error("franchise name cannot be empty")
    break
  case (!data.code): 
    error = new Error("Franchise code cannot be empty")
    break
  case (!data.storeLocation): 
    error = new Error("Franchise store location cannot be empty")
    break
  case (!data.owner): 
    error = new Error("Franchise owner cannot be empty")
    break
  }
  if(error) {
    error.status = 400
    throw error
  }
  return
}


class FranchiseController {
    async createFranchise(req, res) {
        try {
            const { user, body } = req
            validateFranchise(body)
            let franchise = new Franchise(body)
            franchise = franchise.save()
            console.log('Franchise Successfully created')
            return __.success(res, franchise, 'Franchise Successfully created')
        } catch (error) {
            console.log('Erro while creating franchise', error)
            return __.error(res, error)
        }
    }

    async getAllFranchise(req, res) {
        try {
            const { user } = req
             if (user.userType !== 'superAdmin') {
                return __.forbidden(res, 'not authorized')
             }
             const franchises = await Franchise.find({})
             return __.send(res, franchises, 'Successfully fetched franchise')
        } catch (error) {
            console.log('Erro while fetching franchise', error)
            return __.error(res, error)
        }
    }

    async getFranchiseById(req, res) {
        try {
            const { user, params: { franchiseId } } = req
             if (user.userType !== 'superAdmin' || user.userType !== 'tenantAdmin') {
                return __.forbidden(res, 'not authorized')
             }
             const franchise = await Franchise.findOne({ _id: franchiseId })
             return __.send(res, franchise, 'Successfully fetched franchise')
        } catch (error) {
            console.log('Erro while fetching franchise', error)
            return __.error(res, error)
        }
    }

    async updateFranchise(req, res) {
        try {
            const { user, body, params: { franchiseId } } = req
            if (!franchiseId) {
                return __.error(res, 'Please send Franchise Id')
            }
            validateFranchise(body)
            const existingFranchise = Franchise.findOne({
                _id: franchiseId,
                isDeleted: false
            })
            if (!existingFranchise) {
               return __.notFound(res, 'Franchise not found')
            }
            franchise = Franchise.findOneAndUpdate({
                _id: franchiseId,
                isDeleted: false
            }, {
                body,
                ... existingFranchise
            })
            console.log('Franchise Successfully updated')
            return __.success(res, franchise, 'Franchise Successfully updated')
        } catch (error) {
            console.log('Erro while updating franchise', error)
            return __.error(res, error)
        }
    }

    async deleteFranchise(req, res) {
        try {
            const { user, body, params: { franchiseId } } = req
            if (!franchiseId) {
                return __.error(res, 'Please send Franchise Id')
            }
            const existingFranchise = Franchise.findOne({
                _id: franchiseId,
                isDeleted: false
            })
            if (!existingFranchise) {
               return __.notFound(res, 'Franchise not found')
            }
            franchise = Franchise.findOneAndUpdate({
                _id: franchiseId,
                isDeleted: false
            }, {
                isDeleted: true,
                deletedAt: new Date()
            })
            console.log('Franchise Successfully deleted')
            return __.success(res, franchise, 'Franchise Successfully deleted')
        } catch (error) {
            console.log('Erro while deleted franchise', error)
            return __.error(res, error)
        }
    }
}

const obj = new FranchiseController()
module.exports = obj
