const router = require('express').Router()
const tagController = require('../controllers/tag') 

router.get('/', tagController.findAll)
router.post('/', tagController.create)
router.delete('/tagId', tagController.deleteOne)

module.exports = router