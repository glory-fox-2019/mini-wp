const express = require('express')
const routes = express.Router()
const controller = require('../controllers/controllerUser')
const auth = require('../middleware/auth')


routes.post('/',controller.create)
routes.post('/login',controller.login)
routes.post('/googleLogin',controller.googleLogin)

routes.get('/',auth.authentication,controller.dataUser)


module.exports = routes