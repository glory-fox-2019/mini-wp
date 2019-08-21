const express = require('express');
const { controllerArticle } = require('../controllers');
const routes = express.Router()
const Upload = require('../helper/uploadToGCS');
const Authorize = require('../middleware/authorize');

routes.get('/', controllerArticle.find)
routes.get('/article-owner', controllerArticle.getAllByOwner)
routes.get('/:id', controllerArticle.getOne)

routes.post('/', Upload.multer.single('image'),
    Upload.sendUploadToGCS,
    controllerArticle.create
)

// routes.use(Authorize)
routes.patch('/:id', controllerArticle.update)
routes.delete('/:id', controllerArticle.delete)

module.exports = routes