const mongoose = require('mongoose')
const Schema = mongoose.Schema


const articleSchema = new Schema({
    title : String,
    content : String,
    author : {type: Schema.Types.ObjectId, ref:'User'},
    status: Number,
    imageUrl: String,
    views : Number
})

articleSchema.set('timestamps', true)
const Article = mongoose.model('Article',articleSchema)

module.exports = Article