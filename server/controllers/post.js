const Model = require('../models');

class Post {
  static find(req,res,next){
    let whereData = {}
    if(req.query.search) whereData.title = {$regex: new RegExp(req.query.search,'i')};
    Model.Post
      .find(whereData)
      .then(data => {
        if(data) res.json(data);
        else next({httpStatus: 204, message: 'No Content'})
      })
      .catch(next)
  }
  static findOne(req,res,next){
    Model.Post
      .findById(req.params.id)
      .then(data => {
        if(data) res.json(data);
        else next({httpStatus: 404, message: 'Post not found!'})
      })
      .catch(next)
  }
}

module.exports = Post;