const jwt = require('../helpers/jwt');

module.exports = function(req,res,next){
  let decode = jwt.decodeToken(req.headers.token);
  if(decode){
    console.log(decode);
    req.decode = decode;
    next();
  }else{
    next({httpStatus: 401, message:"Authentication Needed"});
  }
}