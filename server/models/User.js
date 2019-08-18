const mongoose = require('mongoose')
const hashPassword = require('../helpers/hashPassword')

const userSchema = new mongoose.Schema({
  userName : {
    type : String,
    required : [true, 'Username tidak boleh kosong'],
    minlength : [4, 'Username terlalu pendek'],
    maxlength : [20, 'Username terlalu panjang'],
    match : [/^[a-zA-Z]+$/, 'Username hanya boleh huruf']
  },
  email : {
    type : String,
    unique : true,
    required : [true, 'Email tidak boleh kosong'],
    match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Invalid email address'],
  },
  password : {
    type : String,
    required : [true, 'Password tidak boleh kosong'],
    minlength : [4, 'password terlalu pendek']
  }
})

userSchema.pre('save', function() {
  this.password = hashPassword(this.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User