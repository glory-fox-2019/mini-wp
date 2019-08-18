const express = require('express');
const { controllerArticle } = require('../controllers');
const routes = express.Router()
const Upload = require('../helper/uploadToGCS');
const Authorize = require('../middleware/authorize');

routes.get('/', controllerArticle.find)
routes.get('/article-owner', controllerArticle.getAllByOwner)
routes.get('/:id', controllerArticle.getOne)

routes.post('/', 
    Upload.Multer.single('featured_image'),
    Upload.uploadToGCS, 
    controllerArticle.create
)
// routes.put('/:id',
//     Authorize,
//     Upload.multer.single('features_image'),
//     Upload.uploadToGCS,
//     controllerArticle.update
// )
// routes.patch('/:id',
//     Authorize,
//     Upload.multer.single('featured_image'),
//     Upload.uploadToGCS,
//     controllerArticle.update
// )
routes.delete('/:id',
    controllerArticle.delete
)

module.exports = routes