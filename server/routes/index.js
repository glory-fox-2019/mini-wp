const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')
const image = require('./images')

router.use('/articles',article)
router.use('/users',user)
router.use('/images',image)




module.exports = router