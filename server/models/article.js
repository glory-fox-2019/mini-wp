const { Schema, model, ObjectId } = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please input title']
    },
    content: {
        type: String,
        required: [true, 'Please input content']
    },
    image_path: {
        type: String
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'Please input author']
    },
    tagsId: [{ type: ObjectId, ref: 'Tag' }]
}, { timestamps: true })

module.exports = model('Article', articleSchema)