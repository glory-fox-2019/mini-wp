const express = require('express');
const router = express.Router();
const multer  = require('multer')
var upload = multer({ dest: 'public/image' })
const {Authenthication , Authorized} = require('../middelware')

const { artilcle_controllers } = require('../controller')
router.use(Authenthication)

router.get('/'  , artilcle_controllers.list )
router.get('/profile' ,   artilcle_controllers.currentArticle)
router.post('/'  , artilcle_controllers.add )
router.get('/:id' , artilcle_controllers.findOne)
router.put('/:id' ,  Authorized,  artilcle_controllers.updateArticle)
router.delete('/:id' , Authorized  ,   artilcle_controllers.Delete);

module.exports = router