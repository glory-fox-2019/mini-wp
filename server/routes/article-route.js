const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    multer,
    sendUploadToGCS
} = require("../middlewares/images")
const ArticleController = require('../controllers/article-controller')

router.use(auth.authentication)

router.get('/', ArticleController.getAll)
router.get('/published', ArticleController.getAllPublished)

router.post('/', multer.single("image"), sendUploadToGCS, ArticleController.createArticle)

router.get('/edit/:articleId', auth.authorization, ArticleController.editPage)
router.put('/edit/:articleId', auth.authorization, multer.single("imageEdit"), sendUploadToGCS, ArticleController.updateArticle)
router.put('/publish/:articleId', auth.authorization, ArticleController.publishArticle)

router.delete('/delete/:articleId', auth.authorization, ArticleController.delete)

// search by click tag
router.get('/by-tag/:tagId', ArticleController.searchBySelectTag)

// normal search
router.get('/search', ArticleController.normalSearchDraft)
module.exports = router