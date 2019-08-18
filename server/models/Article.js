const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ArticleSchema = new Schema ({
  title: {
    type: String,
    required: [true, "name cannot be empty"]
  },
  content: {
    type: String,
  },
  fileUrl:{
    type: String,
    required: [true, "image cannot be empty"]
  },
  UserId:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }]
},{timestamps: true})

let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article