const router = require('express').Router()
const path = require('path')
const {userAuthentication, userAuthorization} = require('../middlewares/authUser')
const ArticleController = require('../controllers/article')

const {sendUploadToGCS} = require('../middlewares/google-storage')

const Multer = require('multer')
const multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        },
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        }
      })


router.use(userAuthentication)

router.get('/', ArticleController.read)
router.post('/', multer.single('image'), sendUploadToGCS, ArticleController.create)
// router.post('/', ArticleController.create)
router.put('/:_id', userAuthorization, multer.single('image'), sendUploadToGCS, ArticleController.putUpdate)
router.patch('/:_id', userAuthorization, ArticleController.patchUpdate)
router.delete('/:_id', userAuthorization, ArticleController.delete)

module.exports = router