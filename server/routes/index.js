const router = require('express').Router()
const userRoutes = require('./userRoutes')
const articleRoutes = require('./articleRoutes')
const tagRoutes = require('./tagRoutes')

router.use('/users', userRoutes)
router.use('/articles', articleRoutes)
router.use('/tags', tagRoutes)

module.exports = router