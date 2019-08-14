const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  thumbnail: String,
  tags: Array,
  userId: mongoose.Schema.ObjectId
},{
  versionKey: false,
  timestamps: true,
})

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;