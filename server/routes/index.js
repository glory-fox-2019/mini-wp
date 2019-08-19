const route = require('express').Router()
const article = require('./article');
const user = require('./user');

route.use('/articles', article)
route.use('/users', user)

module.exports = route