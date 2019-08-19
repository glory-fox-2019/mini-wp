const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:{
        type: String,
        required: [true, `Title cannot be empty`]
    },
    content:{
        type: String,
        required: [true, `Content cannot be empty`]
    },
    UserId: { type: Schema.Types.ObjectId, ref: 'User' }
},{
    timestamps: true,
    versionKey: false
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;