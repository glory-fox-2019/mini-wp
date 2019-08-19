const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter title"]
    }, 
    content: {
        type: String,
        required: [true, "Please enter content"]
    },
    featured_image: {
        type: String
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', ArticleSchema)