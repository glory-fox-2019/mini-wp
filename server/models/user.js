const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    fullName: String,
    username: String,
    email:  {
        type: String,
        required : [true, 'please input the correct email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type : String,
        required : [true, 'please input the correct password']
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.path('email').validate(function (value, respond) {
    return mongoose
      .model('User')
      .collection
      .countDocuments({ email: value })
      .then(function (count) {
        if (count > 0) {
          return false
        }
      })
      .catch(function (err) {
        throw err
      })
}, 'Email already exists!!')

var User = mongoose.model('User', userSchema)
module.exports = User