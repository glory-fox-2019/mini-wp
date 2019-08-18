const Model = require('../models');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: '.'+process.env.GOOGLE_CLOUD_KEYFILE,
});

class UserPost {
  static find(req,res,next){
    let whereData = {}
    whereData.userId = req.decode.id;
    if(req.query.search) whereData.title = {$regex: new RegExp(req.query.search,'i')};
    Model.Post
      .find(whereData)
      .then(data => {
        console.log(data);
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
    let thumbnail;
    (req.file && req.file.gcsUrl)&& (thumbnail =  req.file.gcsUrl);
    Model.Post
    .create({
        title: req.body.title,
        content: req.body.content,
        thumbnail: thumbnail,
        tags: JSON.parse(req.body.tags),
        userId: req.decode.id,
      })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(next)
  }
  static edit(req,res,next){
    let thumbnail;
    let updateData = {
      title: req.body.title,
      content: req.body.content,
      tags: JSON.parse(req.body.tags)
    }
    if(req.file && req.file.gcsUrl) thumbnail =  req.file.gcsUrl
    if(thumbnail){
      updateData.thumbnail = thumbnail
    } else if(req.body.isUpdateThumbnail === true) {
      updateData.thumbnail = '';
      console.log('Thumbnail Jadi Kosong')
    }
    console.log('thumbnail',req.body.oldThumbnail, req.body.isUpdateThumbnail);
    Model.Post
      .findByIdAndUpdate(req.params.id, updateData, {new: true,runValidators: true})
      .then(data => {
        if(req.body.oldThumbnail && req.body.isUpdateThumbnail === true) {
          console.log('delete ')
          const url = req.body.oldThumbnail.split('/')
          const filename = url[url.length - 1];
          return storage
            .bucket(process.env.DEFAULT_BUCKET_NAME)
            .file(filename)
            .delete()
        }else{
          return data;
        }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static delete(req,res,next){
    let dataDeletedPost;
    Model.Post
      .findOneAndDelete({
        userId: req.decode.id,
        _id: req.params.id
      })
      .then(data => {
        dataDeletedPost = data;
        if(data.thumbnail){
          const url = data.thumbnail.split('/')
          const filename = url[url.length - 1];
          return storage
            .bucket(process.env.DEFAULT_BUCKET_NAME)
            .file(filename)
            .delete()
        }else{
          return
        }
      })
      .then((data) => {
        if(dataDeletedPost){
          res.json({
            message: 'Successfully delete post'
          });
        }else{
          next({httpStatus: 404, message: 'Post not found!'})
        }
      })
      .catch(next);
  }
}

module.exports = UserPost;