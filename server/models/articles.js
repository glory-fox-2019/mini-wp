const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema({
    title:  { 
        type: String, 
        required:true },
    content: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'}
    },
    
    { timestamps: { createdAt: 'created_at' }
});

var article = mongoose.model('Article', articleSchema)
module.exports = article