const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb')


const article_schema = new Schema({
  title : {
      type : String
  },
  image : {
      type : String
  }, 
  content : {
    type : String
  },
  author : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  created_at : {
    type : Date,
    default : new Date()
  }
});


const article = mongoose.model('article' , article_schema);

module.exports = article