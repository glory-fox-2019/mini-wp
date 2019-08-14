const express = require('express')
const router = express.Router()
const article = require('./article')
// const user = require('')

router.use('/articles',article)
// routers.use('/users',user)




module.exports = router