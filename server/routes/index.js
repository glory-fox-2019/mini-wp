const router = require('express').Router()
const userRoute = require('./user')
const articleRoute = require('./article')

router.get('/',(req,res,next) => {
    res.status(200).json({message: "connected"})
})
router.use('/user',userRoute)
router.use('/article', articleRoute)

module.exports = router