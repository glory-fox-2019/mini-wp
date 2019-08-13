const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', articleController.findArticles)
router.post('/filter', articleController.findOne)
router.post('/create', articleController.create)
router.patch('/update', articleController.update)
router.delete('/delete',articleController.delete)

module.exports = router;