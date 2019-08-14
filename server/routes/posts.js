const router = require('express').Router();
const post = require('../controllers/post');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication);
router.get('/', post.find); //Search post and Find Post
router.post('/', post.create);

router.get('/:id', authorization.post, post.findOne);
router.put('/:id', authorization.post, post.edit);
router.delete('/:id', authorization.post, post.delete);

module.exports = router;