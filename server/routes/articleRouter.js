const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

router.use(authentication)

router.post('/', articleController.create)
router.get('/', articleController.find)
router.patch('/:id', articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router