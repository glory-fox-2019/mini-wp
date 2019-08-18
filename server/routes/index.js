const indexRouter = require('express').Router()
const article = require('./article')
const users = require('./user')

indexRouter.use('/users', users)
indexRouter.use('/articles',article)

module.exports = indexRouter