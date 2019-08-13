const router = require('express').Router()
const ArticleController = require('../controllers/article')

router.get('/', ArticleController.read)
router.post('/', ArticleController.create)
router.put('/:id', ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router