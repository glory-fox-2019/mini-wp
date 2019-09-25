const controller = require('../controllers/articleController')
const { authentication, authorization }= require('../middleware/authaoth')
const router = require('express').Router()

router.get('/', controller.findAll)
router.use(authentication)

router.post('/', controller.create)
router.get('/user', controller.userArticle)
router.get('/creator', controller.creatorArticle)
router.get('/:articleId', controller.findOne)
router.delete('/:articleId', authorization, controller.delete)
router.put('/:articleId', authorization, controller.update)

module.exports = router