const express = require('express');
const routes = express.Router();
const article = require('./article')
const user = require('./user')

routes.use('/article'  ,  article)
routes.use('/user' , user)

module.exports = routes