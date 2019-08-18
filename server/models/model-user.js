const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Bcrypt = require('../helper/bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (email) {
                return new Promise(function (resolve, reject) {
                    User
                        .findOne({ email })
                        .then(data => {
                            if (data) resolve(false)
                            else resolve(true)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            },
            message: props => props.value + ' already exist'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'length min of password is 4']
    }

}, { timestamps: true })

userSchema.pre('save', function(next, done){
    this.password = Bcrypt.hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User