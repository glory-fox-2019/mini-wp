const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    content: {
        type: String,
        required: [true, 'Content is required.']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image: String,
    featured_image_name: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    isPublished: Boolean
}, {
    timestamps: {
        created_at: 'createdAt'
    }
});


const Article = mongoose.model('Article', articleSchema)

module.exports = Article;