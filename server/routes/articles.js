const router = require('express').Router()
const ArticleController = require('../controllers/articles')
const  { authentication } = require('../middlewares/authentication')
const  { authorization } = require('../middlewares/authentication')

router.post('/', authentication, ArticleController.create)
router.get('/', ArticleController.findAll)
router.get('/articleUser', authentication, ArticleController.articleUser)
router.put('/:id', authentication, ArticleController.update)
router.delete('/:id', authorization, ArticleController.delete)
router.get('/:id', ArticleController.findOne)

module.exports = router