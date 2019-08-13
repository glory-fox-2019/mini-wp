const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema ({
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
})

const Article = mongoose.model('Article', todoSchema)

module.exports = Article