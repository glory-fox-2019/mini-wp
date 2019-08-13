const article = require('./router-article')
const users = require('./router-user')
const express = require('express');
const routes = express.Router();
// const authentication = require('../midleware/authentication')

routes.use('/users', users)
routes.use('/article', authentication, article)

routes.get('*', (req, res) => {
    res.status(404).json({ msg: 'Page not found' })
})

module.exports = routes