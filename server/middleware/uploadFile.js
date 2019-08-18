const multer = require('multer')
const randomNameFile = require('../helpers/randomNameFile')

const accepted_extensions = ['jpg', 'png']
const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename : function (req, file, cb) {
    cb(null, randomNameFile(file.originalname))
  }
})
const upload = multer({
  storage : storage,
  limits: { 
    fileSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
        return cb(null, true)
    }
    cb('Only ' + accepted_extensions.join(", ") + ' files are allowed!');
  }
}).single('featuredImage')

function uploadFile(req, res, next) {
  upload(req, res, function(err) {
    if(err instanceof multer.MulterError) {
      next({
        status : 400,
        message : err.message
      })
    }else if(err){
      next({
        status : 400,
        message : [err]
      })
    }else{
      next()
    }
  })
}


module.exports = uploadFile