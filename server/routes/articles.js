const controller = require('../controllers/articleController')
const { authentication, authorization }= require('../middleware/authaoth')
const router = require('express').Router()

router.use(authentication)
router.get('/', controller.findAll)
router.get('/myArticle', controller.myArticle)
router.post('/', controller.create)
router.get('/one/:articleId', controller.findOne)
router.delete('/one/:id', authorization, controller.delete)

module.exports = router