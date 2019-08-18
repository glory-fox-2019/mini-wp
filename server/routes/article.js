const articleRouter = require('express').Router()
const articleController = require('../controllers/article')
const { sendUploadToGCS, deleteFromGCS } = require('../middlewares/google-cloud-storage')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const upload = require('../middlewares/multer')
const createTag = require('../middlewares/create-tag')

articleRouter.use('/', authentication)
articleRouter.get('/', articleController.findAll)
articleRouter.get('/user', articleController.findUserArticles)
articleRouter.get('/:articleId', articleController.findOne)

articleRouter.use('/:articleId', authorization)
articleRouter.delete('/:articleId', articleController.deleteOne)

articleRouter.post('/', upload.single('file'), sendUploadToGCS, createTag, articleController.create)
articleRouter.patch('/:articleId', upload.single('file'), sendUploadToGCS, createTag, articleController.updateOne)

module.exports = articleRouter