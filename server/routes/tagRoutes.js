const router = require('express').Router()
const TagController = require('../controllers/TagController')

router.get('/findAll', TagController.findAll)
router.get('/find/:id', TagController.findOne)

module.exports = router