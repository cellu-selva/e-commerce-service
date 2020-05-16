const __ = require('../../../helpers/response')

class AdminClass {
    isAdmin(req, res, next) {
        if (req.user && req.user.get('userType') === 'superAdmin') {
            next()
        } else {
            __.forbidden(res, 'You\'re not admin')
        }
    }

    isTenantAdmin(req, res, next) {
        if (req.user && req.user.get('userType') === 'tenantAdmin') {
            next()
        } else {
            __.forbidden(res, 'You\'re not a tenant admin')
        }
}

AdminClass = new AdminClass()
module.exports = AdminClass