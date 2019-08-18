const express = require('express')
const multer = require('multer')
const uploadImage = multer({
    dest : './uploads'
})
const router = express.Router()
const controllerArticle = require('../controllers/controllerArticle')
const auth= require('../middleware/auth')

router.use(auth.authentication)
router.get('/home',controllerArticle.allPosts)
router.get('/all-articles',controllerArticle.allPostsNoFilter)
router.get('/',controllerArticle.findAll)
router.post('/',controllerArticle.create)
router.delete('/:id',auth.authorization,controllerArticle.delete)
router.get('/:id',controllerArticle.findOne)
router.patch('/:id',auth.authorization,controllerArticle.update)

router.post('/upload',uploadImage.single('file'),controllerArticle.upload)


module.exports = router