const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Article = new Schema({
    title:{ type : String, required:true},
    content: String,
  },
    {timestamps: { createdAt: 'created_at' } 
});

const Model = mongoose.model('Article', Article);
module.exports = Model