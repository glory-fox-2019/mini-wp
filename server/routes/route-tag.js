const express = require('express');
const routes = express.Router()
const { controllerTag } = require('../controllers');

routes.get('/', controllerTag.list)
routes.get('/name', controllerTag.getByName)

module.exports = routes