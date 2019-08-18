const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    }, 
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function(value) {
                return /^[a-z][a-z0-9]+([_.-][a-z0-9]*)*[a-z0-9]+@[a-z]+.[a-z]+$/.test(value)                
            },
            message: "This email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    articles: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Article'
    }]
}, {
    versionKey: false
})

const User = mongoose.model('User', UserSchema)

User.schema.path('email').validate(function(value, next) {
    return new Promise(function (resolve, reject) {
        User.findOne({email: value})
            .then(user => {
                if(user) {
                    reject(new Error("This email is already registered"))
                } else {
                    resolve()
                }
            })
            .catch(err => {throw err})

    })
})

module.exports = mongoose.model('User', UserSchema)