const express = require('express');
const router = express.Router();
const { user_controller } = require('../controller')

router.post('/register' , user_controller.Register)
router.post('/login' , user_controller.login)
router.post('/google' , user_controller.LoginGoogle)

module.exports = router