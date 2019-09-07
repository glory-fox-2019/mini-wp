const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const {authentication} = require('../middlewares/authentication')
const file = require("../helpers/file")
const {authorization} = require('../middlewares/authorization')

router.get('/all', ArticleController.allArticle)
// router.get('/', ArticleController.searchArticle)
router.get('/search/:title', ArticleController.searchArticle)
router.get('/article/:id', ArticleController.findOne)
router.use(authentication)
router.get('/tags/:id', ArticleController.findBytag)
router.get('/own', ArticleController.ownArticle)
router.post('/create', file.multer.single('file'), file.sendUploadToGCS, ArticleController.create)
router.patch('/:id', authorization, file.multer.single('file'), file.sendUploadToGCS, ArticleController.update)
router.delete('/:id', authorization, ArticleController.delete)

module.exports = router