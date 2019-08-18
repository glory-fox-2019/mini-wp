const router = require('express').Router()
const authToken = require('../middlewares/authToken')
const ArticleController = require('../controllers/article')
const authOwner = require('../middlewares/authOwner')
const images = require('../middlewares/image');

router.post('/create',authToken,images.multer.single('image'), images.sendUploadToGCS ,ArticleController.createArticle)
router.patch('/update/:id',authToken,authOwner,images.multer.single('image'), images.sendUploadToGCS ,ArticleController.updateArticle)
router.delete('/delete/:id', authToken, authOwner, ArticleController.delete)
router.get('/home',ArticleController.home)
router.get('/view/:id', ArticleController.view)
router.get('/myarticle/:status',authToken,ArticleController.getMyArticle)

module.exports = router