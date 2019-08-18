const controllers = require('../controllers');
const router = require('express').Router();
const authentication = require('../middlewares/authentication')

router.post('/login', controllers.user.login);
router.post('/login/google', controllers.user.loginWithGoogle);
router.post('/register', controllers.user.register);
router.get('/', authentication, controllers.user.getUser);

module.exports = router;