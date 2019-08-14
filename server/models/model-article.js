const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user'
    // },
    title: {
        type: String,
        required: [true, 'title tidak boleh kosong']
    },
    content: {
        type: String,
        required: [true, 'Content harus diisi']
    },


}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article