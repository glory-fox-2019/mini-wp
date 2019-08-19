const route = require('express').Router()
const UserController = require('../controllers/user-controller')

route.post('/signup',UserController.signup)
route.post('/signin', UserController.signin)
route.post('/signinGoogle', UserController.signingoogle)


module.exports = route