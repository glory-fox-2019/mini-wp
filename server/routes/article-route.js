const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    multer,
    getPublicUrl,
    sendUploadToGCS
} = require("../middlewares/images")
const ArticleController = require('../controllers/article-controller')

router.use(auth.authentication)

router.get('/', ArticleController.getAll)

router.post("/upload-image", multer.single("image"), sendUploadToGCS, (req, res, next) => {
    res.status(200).json(req.file.cloudStoragePublicUrl)
})

router.post('/', multer.single("image"), sendUploadToGCS, ArticleController.createArticle)

router.get('/edit/:articleId', auth.authorization, ArticleController.editPage)
router.put('/edit/:articleId', auth.authorization, ArticleController.updateArticle)
router.delete('/delete/:articleId', auth.authorization, ArticleController.delete)

module.exports = router