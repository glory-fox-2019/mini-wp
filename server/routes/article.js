const express = require('express')
const router = express.Router()
const controllerArticle = require('../controllers/controllerArticle')

router.post('/',controllerArticle.create)
router.get('/',controllerArticle.findAll)
router.delete('/:id',controllerArticle.delete)
router.get('/:id',controllerArticle.findOne)
router.patch('/:id',controllerArticle.update)


module.exports = router