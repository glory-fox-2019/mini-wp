const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const articles = mongoose.model('articles', articleSchema)

module.exports = articles;