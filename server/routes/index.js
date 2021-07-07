const router = require('express').Router()
const routerUser = require('./users')
const routerArticle = require('./articles')
const routerImage = require('./image')

router.use('/users', routerUser)
router.use('/articles', routerArticle)
router.use('/image', routerImage)

module.exports = router