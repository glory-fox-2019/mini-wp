const express = require('express');
const controllerArticle = require('../controller/controller-article');
const routes = express.Router()

routes.post('/list', controllerArticle.create)

module.exports = routes