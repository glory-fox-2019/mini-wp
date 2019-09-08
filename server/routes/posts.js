const router = require('express').Router();
const post = require('../controllers/post');

router.get('/', post.find); //Search post and Find Post
router.get('/:id', post.findOne);

module.exports = router;