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
  static create(req,res,next){
    Model.Post
    .create({
        title: req.body.title,
        content: req.body.content,
        // thumbnail: req.body.thumbnail,
        tag: req.body.tag,
        userId: req.decode.id,
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(next)
  }
  static edit(req,res,next){
    Model.edit
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        thumbnail: req.body.thumbnail,
        tag: req.body.tag
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static delete(req,res,next){
    Model.delete
      .remove({
        _id: req.params.id
      })
      .then(data => {
        res.json({
          message: 'Successfully delete post'
        });
      })
      .catch(next);
  }
}

module.exports = Post;