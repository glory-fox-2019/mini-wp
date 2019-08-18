const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/all', articleController.findAll)
router.post('/', articleController.create)
router.get('/', articleController.find)
router.patch('/:id', authorization, articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router