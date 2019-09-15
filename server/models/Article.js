const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Article = new Schema({
    title:{ type : String, required:true},
    content: String,
    image : String,
    user : {
      type : ObjectId,
      ref : 'User'
  }
  },
    {timestamps: { createdAt: 'created_at' } 
});

const Model = mongoose.model('Article', Article);
module.exports = Model