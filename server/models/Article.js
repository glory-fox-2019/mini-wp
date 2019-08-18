const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title : {
    type : String
  },
  content : {
    type : String
  },
  created_at : {
    type : String,
    default : new Date()
  },
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  featuredImage : {
    type : String
  }
})

const Article = mongoose.model('Article', articleSchema)


module.exports = Article