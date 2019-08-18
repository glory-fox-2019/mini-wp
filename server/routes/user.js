const router = require('express').Router()
const authToken = require('../middlewares/authToken')
const userController = require('../controllers/user')

router.get('/myprofile',authToken,userController.profile)
router.get('/profile/:id', userController.profile)
router.post('/login',userController.login)
router.post('/register', userController.register)
router.post('/loginOauth', userController.loginFromOauth)

module.exports = router