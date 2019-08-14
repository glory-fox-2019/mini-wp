const controllers = require('../controllers');
const router = require('express').Router();
const authentication = require('../middlewares/authentication')

router.get('/', authentication, controllers.user.getUser);
router.post('/login', controllers.user.login);
router.post('/register', controllers.user.register);

module.exports = router;