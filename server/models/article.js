const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter title']
    },
    content: {
        type: String,
        required: [true, 'Please enter content']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image: {
        type: String,
        required: [true, 'Please enter image']
    }
},{
    versionKey: false,
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article





