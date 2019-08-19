const route = require('express').Router()
const ArticleController = require('../controllers/article-controller')
const { authentication, authorization } = require('../middlewares/auth')
const { sendUploadToGCS, multer } = require('../helpers/image');

route.get('/top-newest', ArticleController.top)
route.get('/myarticles', authentication,  ArticleController.myArticle)
route.post('/', authentication, multer.single('image'), sendUploadToGCS, ArticleController.create)
route.get('/', ArticleController.findAll)
route.get('/:id',authentication, ArticleController.findOne)
route.delete('/:id',authentication, authorization, ArticleController.destroy)
route.patch('/:id', authentication, authorization, ArticleController.update)

module.exports = route