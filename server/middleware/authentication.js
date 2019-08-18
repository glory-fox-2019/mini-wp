const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    req.user = {
      id : decoded.id,
      email : decoded.email,
      userName : decoded.userName
    }
    next()
  }catch(err){
    if(err.message === 'invalid signature') {
      next({
        status : 400,
        message : 'Something wrong with your token'
      })
    } else {
      next(err)
    }
  }
}

module.exports = authentication