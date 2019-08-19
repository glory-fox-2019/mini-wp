const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: String,
    content: String,
    createdAt: Date,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image:{
        type: String,
        // required: [true, 'Image required']
    }
});

const Article = mongoose.model('Article', articleSchema)
module.exports = Article