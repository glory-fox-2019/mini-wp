const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller')

router.post('/login-google', UserController.loginGoogle)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router