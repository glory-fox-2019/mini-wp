const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    multer,
    sendUploadToGCS
} = require("../middlewares/images")
const ArticleController = require('../controllers/article-controller')

router.use(auth.authentication)

// get drafts
router.get('/', ArticleController.getAll)

// normal search
router.get('/search', ArticleController.normalSearch)
router.get('/search-global', ArticleController.normalSearchGlobal)

// get published articles
router.get('/published', ArticleController.getAllPublishedUser)
router.get('/published-global', ArticleController.getAllPublishedGlobal)

// get one for preview
router.get('/:articleId', ArticleController.preview)

router.post('/', multer.single("image"), sendUploadToGCS, ArticleController.createArticle)

// edit article
router.get('/edit/:articleId', auth.authorization, ArticleController.getOne)
router.put('/edit/:articleId', auth.authorization, multer.single("imageEdit"), sendUploadToGCS, ArticleController.updateArticle)

// publish article
router.put('/publish/:articleId', auth.authorization, ArticleController.publishArticle)

// delete article
router.delete('/delete/:articleId', auth.authorization, ArticleController.delete)

// search by click tag
router.get('/by-tag/:tagId', ArticleController.searchBySelectTag)

module.exports = router