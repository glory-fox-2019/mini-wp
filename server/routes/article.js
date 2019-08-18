const express = require('express')
const router = express.Router()
const images = require('../middlewares/image')
const ArticleController = require('../controllers/ArticleController')
const Authentication = require('../middlewares/authen')
const Authorization = require('../middlewares/author')
const deleteImage = require('../middlewares/deleteImage')
router.use(Authentication)

router.post('/', images.multer.single('image'), images.sendUploadToGCS, ArticleController.create)
router.get('/', ArticleController.findAll)
router.put('/:id', Authorization, images.multer.single('image'), images.sendUploadToGCS,  ArticleController.update)
router.delete('/:id', Authorization, ArticleController.destroy, deleteImage)

module.exports = router