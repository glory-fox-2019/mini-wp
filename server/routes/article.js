const express = require('express');
const controllerArticle = require('../controller/controller-article');
const routes = express.Router()

routes.post('/create', controllerArticle.create)
routes.get('/list', controllerArticle.fetchArticle)
routes.delete('/:id', controllerArticle.delete)
routes.get('/:id', controllerArticle.getOne)
routes.patch('/:id', controllerArticle.update)

module.exports = routes