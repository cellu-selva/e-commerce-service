'use strict'

const __ = require('../../../helpers/response')
const AddressModel = require('./../../../models/address')
const UserModel = require('./../../../models/user')
const validateAddress = (data) => {
  let error
  switch (true) {
    case (!(data && data.addressLine1 && data.addressLine1.constructor === String && (data.addressLine1 = data.addressLine1.trim()))):
      error = new Error('Please provide addressLine1')
      break
    case (!(data && data.addressLine2 && data.addressLine2.constructor === String && (data.addressLine2 = data.addressLine2.trim()))):
      error = new Error('Please provide addressLine2')
      break
    case (!(data && data.city && data.city.constructor === String && (data.city = data.city.trim()))):
      error = new Error('Please provide city')
      break
    case (!(data && data.pincode && data.pincode.constructor === String && (data.pincode = data.pincode.trim()))):
      error = new Error('Please provide pincode')
      break
    case (!(data && data.state && data.state.constructor === String && (data.state = data.state.trim()))):
      error = new Error('Please provide state')
      break
    case (!(data && data.phoneExt && data.phoneExt.constructor === String && (data.phoneExt = data.phoneExt.trim()))):
      error = new Error('Please provide phone extension')
      break
    case (!(data && data.phone && data.phone.constructor === String && (data.phone = data.phone.trim()))):
      error = new Error('Please provide phone number')
      break
    // case (!(data && data.latitude && data.latitude.constructor === String && (data.latitude = data.latitude.trim()))):
    //   error = new Error('Please provide latitude number')
    //   break
    // case (!(data && data.logitude && data.logitude.constructor === String && (data.logitude = data.logitude.trim()))):
    //   error = new Error('Please provide logitude number')
    //   break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}


class Address {
  async createAddress(req, res) {
    try {
      const { body, user } = req
      validateAddress(body)
      body.userId = user._id
      let address = new AddressModel(body)
      address = await address.save()
      if (!user.addresses.primary) {
        user.addresses.primary = address._id
      } else {
        user.addresses.secondary.push(address._id)
      }
      user.save()
      __.success(res, address, 'Address successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async updateAddressById(req, res) {
    try {
      const { params: { addressId }, body } = req
      validateAddress(body)
      if (!body._id || (addressId != body._id)) {
        return __.send(res, 400, 'Please send an address id to update')
      }
      body.userId = user._id
      const condition = {
        _id: addressId,
        isDeleted: false
      }
      const address = await AddressModel.findOneAndUpdate(condition, body, { new: true })
      __.success(res, address, 'Address successfully updated')
    } catch (error) {
      __.error(res, error)
    }
  }

  async deleteAddressById(req, res) {
    try {
      const { body, user } = req
      if (!body._id) {
        return __.send(res, 400, 'Please send address id to delete')
      }
      const condition = {
        _id: body._id,
        isDeleted: false
      }
      body.isDeleted = true
      body.deletedAt = new Date()
      body.deletedBy = user
      address = await AddressModel.findOneAndUpdate(condition, body, { new: true })
      if (user.addresses.primary == address._id) {
        user.addresses.primary = {}
      } else {
        const index = _.findIndex(user.addresses.secondary, (add) => {
          add._id == address._id
        })
        if (index > -1) {
          user.addresses.secondary = user.addresses.secondary.splice(index, 1)
        }
      }
      await UserModel.findOneAndUpdate({ _id: user._id, isDeleted: false }, user)
      __.success(res, address, 'Address successfully deleted')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getAddressById(req, res) {
    try {
      const { params: { addressId } } = req
      if(!addressId) {
        __.send(res, 400, 'Please send address id')
      }
      const address = await AddressModel.findOne({
        _id: addressId,
        isDeleted: false
      })
      __.success(res, address, 'Address successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }

  async getAddressByUser(req, res) {
    try {
      const { user } = req
      const address = await AddressModel.find({
        userId: user._id,
        isDeleted: false
      }).populate('userId')
      __.success(res, address, 'Address successfully fetched')
    } catch (error) {
      __.error(res, error)
    }
  }
}


const obj = new Address()
module.exports = obj
