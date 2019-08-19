const router= require('express').Router()
const userController= require('../controllers/userController')
const { authentication } = require('../middleware/authaoth');
const { authorization } = require('../middleware/authaoth');
// const { sendUploadToGCS } = require('../helpers/image');

router.post('/login', userController.login)
router.post('/register', userController.register)
router.patch('/update', authentication, userController.update) //sendUploadToGCS
router.get('/', authentication, userController.findOne)

module.exports = router
