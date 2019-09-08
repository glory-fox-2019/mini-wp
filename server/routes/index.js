const articles = require('./route-article')
const users = require('./route-user')
const tags = require('./route-tag');
const express = require('express');
const routes = express.Router();
const authentication = require('../middleware/authenticate');

routes.use('/user', users)
routes.use('/article', authentication, articles) // authentication
routes.use('/tag', tags)

module.exports = routes