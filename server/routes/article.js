const express = require('express')
const multer = require('multer')
const uploadImage = multer({
    dest : './uploads'
})
const router = express.Router()
const controllerArticle = require('../controllers/controllerArticle')

router.post('/',controllerArticle.create)
router.get('/',controllerArticle.findAll)
router.delete('/:id',controllerArticle.delete)
router.get('/:id',controllerArticle.findOne)
router.patch('/:id',controllerArticle.update)
router.post('/upload',uploadImage.single('file'),controllerArticle.upload)


module.exports = router