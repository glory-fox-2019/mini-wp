const express = require("express")
const router = express.Router()
const ArticleController = require("../controllers/articleController")
const {authenticate, authorization} = require("../middlewares/auth")
const {multer, sendUploadToGCS} = require("../helpers/image")

router.use(authenticate)
router.get('/', ArticleController.findAll)
router.post('/create', multer.single('featuredImage'),sendUploadToGCS, ArticleController.create)
router.put('/fav/:id',ArticleController.favourited )
router.get('/:id', ArticleController.searchById)
router.put('/:id', authorization, ArticleController.update)
router.delete('/:id', authorization, ArticleController.delete)



module.exports = router