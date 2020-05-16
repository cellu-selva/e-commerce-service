const express = require('express')
const app = express.Router()

const UserController = require('../controllers/user')
const Auth = require('../middlewares/auth')
const Admin = require('../middlewares/admin')

const authenticate = Auth.authenticate.bind(Auth)
const isAdmin = Admin.isAdmin.bind(Admin)

const loginHandler = UserController.loginHandler.bind(UserController)
const deleteSession = Auth.deleteSession.bind(Auth)
const createUserHandler = UserController.createUserHandler.bind(UserController)
const editUserHandler = UserController.editUserHandler.bind(UserController)
const updatePasswordHandler = UserController.updatePasswordHandler.bind(UserController)
const deleteUserHandler = UserController.deleteUserHandler.bind(UserController)
const getUsersHandler = UserController.getUsersHandler.bind(UserController)
const confirmInvitationHandler = UserController.confirmInvitationHandler.bind(UserController)
const currentUserHandler = UserController.currentUserHandler.bind(UserController)
const signUpHandler = UserController.signUpHandler.bind(UserController)
const verifyAccountHandler = UserController.verifyAccountHandler.bind(UserController)

app.post('/sessions/', loginHandler)

app.delete('/sessions/', authenticate, deleteSession)

app.post('/users/', createUserHandler)

app.put('/users/:id', authenticate, isAdmin,  editUserHandler)

// update password
app.put('/users/:id/password', authenticate, updatePasswordHandler)

app.delete('/users/:id', authenticate, isAdmin, deleteUserHandler)

app.get('/users/', authenticate, isAdmin, getUsersHandler)

app.get('/users/:token/confirm', confirmInvitationHandler)

// gives current user data
app.get('/users/me', authenticate, currentUserHandler)

app.post('/accounts', signUpHandler)

app.get('/accounts/:token/verify', verifyAccountHandler)
app.patch('/hahah', (req, res)=> {
    res.send('operopoepropop')
})
module.exports = app
