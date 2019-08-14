const jwt = require('../helpers/jwt');

module.exports = function(req,res,next){
  let decode = jwt.decodeToken(req.headers.token);
  if(decode.isLogin){
    req.decode = decode;
    next();
  }else{
    next({httpStatus: 401, message:"User need login"});
  }
}