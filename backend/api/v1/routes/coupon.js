const express = require('express')
const app = express.Router()
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const couponController = require('../controllers/coupon')

app.post('/coupon', auth.authenticate, admin.isAdmin, couponController.createCoupon)
app.get('/coupon/:couponId', auth.authenticate, couponController.getCouponById)
app.put('/coupon/:couponId', auth.authenticate, admin.isAdmin, couponController.updateCouponById)
app.delete('/coupon/:couponId', auth.authenticate, admin.isAdmin, couponController.deleteCouponById)


app.get('/applyCoupon/:coupon', auth.authenticate, couponController.applyCoupon)
module.exports = app
