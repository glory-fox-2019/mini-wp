const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')

router.post('/', articleController.create)
router.get('/', articleController.find)
router.patch('/:id', articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router