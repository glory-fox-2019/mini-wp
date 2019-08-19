const router = require('express').Router()
const UserController = require('../controllers/user')
const verifyToken = require('../middlewares/verify')
const { authentication, autherization } = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.get('/find/:email', UserController.findOne)
router.post('/signin', UserController.login)
router.post(('/google-signin', verifyToken, UserController.googleSignIn))
// router.get(('/'))

module.exports = router