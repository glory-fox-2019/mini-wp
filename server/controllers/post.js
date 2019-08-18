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
    let postData;
    Model.Post
      .findById(req.params.id)
      .then(data => {
        postData = data;
        return Model.User
          .findById(postData.userId)
      })
      .then(userData => {
        if(postData){
          let userPayload = {
            name: userData.name,
            role: userData.role,
          }
          let payload = {
            tags: postData.tags,
            _id: postData._id,
            title: postData.title,
            content: postData.content,
            thumbnail: postData.thumbnail,
            user: userPayload,
            createdAt: postData.createdAt,
            updatedAt: postData.updatedAt
          }
          res.json(payload);
        }
        else next({httpStatus: 404, message: 'Post not found!'})
      })
      .catch(next)
  }
}

module.exports = Post;