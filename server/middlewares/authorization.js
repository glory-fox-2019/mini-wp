const Model = require('../models');
module.exports = {
  post(req,res,next){
    Model.Post
      .findOne({
        _id: req.params.data,
        userId: req.decode.id,
      })
      .then(data => {
        if(data) next();
        else next({httpStatus: 401, message:"Unauthorized access"})
      })
  },
}