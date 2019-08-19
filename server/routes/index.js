const router = require('express').Router()
const routerUser = require('./users')
const routerArticle = require('./articles')

router.use('/users', routerUser)
router.use('/articles', routerArticle)

module.exports = router