const router = require('express').Router();
const post = require('../controllers/user-post');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const upload = require('../middlewares/upload')
const gcs = require('../middlewares/google-cloud-storage.js');

router.use(authentication);

router.get('/', post.find); //Search post and Find Post
router.post('/', upload, gcs.sendUploadToGCS, post.create);

router.put('/:id', authorization.post ,upload, gcs.sendUploadToGCS, post.edit);
router.get('/:id', authorization.post, post.findOne);
router.delete('/:id', authorization.post, post.delete);


module.exports = router;