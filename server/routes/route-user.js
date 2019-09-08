const express = require('express');
const { controllerUser } = require('../controllers');
const routes = express.Router()

routes.get('/', controllerUser.list)
routes.post('/register', controllerUser.register)
routes.post('/login', controllerUser.login)
routes.post('/googlesignin', controllerUser.googleSignin)

module.exports = routes