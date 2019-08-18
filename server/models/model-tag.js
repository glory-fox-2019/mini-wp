const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tagSchema = new Schema({
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    name: {
        type: String,
        // require: true,
        unique: true,
        // validate: {
        //     validator: function (name) {
        //         return new Promise(function (resolve, reject) {
        //             Tag
        //                 .findOne({ name })
        //                 .then(data => {
        //                     if (data) resolve(false)
        //                     else resolve(true)
        //                 })
        //                 .catch(err => {
        //                     reject(err)
        //                 })
        //         })
        //     },
        //     message: props => props.value + ' already exist'
        // }
    }

}, { timestamps: true})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag