const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  UserId: {
    type: ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article