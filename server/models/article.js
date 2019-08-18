const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title cannot be empty"]
    },
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'Users' },
    featuredImage: String,
    favouritedBy :[{
        type: Schema.Types.ObjectId, ref: 'Users'
    }],
    tags:[{
        type: String
    }]
}, {timestamps : true});

const Article = mongoose.model('Articles', articleSchema);
module.exports = Article
