const router = require('express').Router();
const ArticleController = require('../controller/articleController');
const { Authentication, Authorization } = require('../middleware/authentication');

router.use(Authentication);
router.get('/all', ArticleController.findAll);
router.get('/:articleId', ArticleController.findOne);
router.get('/', ArticleController.findByUserId);
router.post('/', ArticleController.create);
router.patch('/:articleId', Authorization, ArticleController.edit);
router.delete('/:articleId', Authorization, ArticleController.delete);


module.exports = router;