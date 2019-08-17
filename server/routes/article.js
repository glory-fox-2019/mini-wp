const express = require('express')
const router = express.Router()
const images = require('../middlewares/image')
const ArticleController = require('../controllers/ArticleController')
const Authentication = require('../middlewares/authen')

router.use(Authentication)

router.post('/', images.multer.single('image'), images.sendUploadToGCS, ArticleController.create)
router.get('/', ArticleController.findAll)
router.put('/:id', ArticleController.update)
router.delete('/:id', ArticleController.destroy)

module.exports = router