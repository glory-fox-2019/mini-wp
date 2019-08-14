const article = require('./article')
// const users = require('./router-user')
const express = require('express');
const routes = express.Router();

// routes.use('/users', users)
routes.use('/article', article) // authentication

routes.get('*', (req, res) => {
    res.status(404).json({ msg: 'Page not found' })
})

module.exports = routes