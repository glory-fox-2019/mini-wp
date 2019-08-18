const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  content: {
    type:String,
    required: true,
  },
  thumbnail: {
    type:String,
  },
  tags: Array,
  userId: mongoose.Schema.ObjectId
},{
  versionKey: false,
  timestamps: true,
})

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;