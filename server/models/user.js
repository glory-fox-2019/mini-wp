const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt')
const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  username: {
    type:String,
    required: true,
  },
  password: {
    type:String,
    required: true,
  },
  email: {
    type:String,
    required: true,
    validate: {
      validator: function(v){
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email` 
    }
  },
  role: String,
  loginWith: String,
},{
  versionKey: false,
  timestamps: true,
})

userSchema.pre('save', function(){
  this.password = bcrypt.hashPassword(this.password);
});

const User = mongoose.model('Users', userSchema);

User.schema.path('email').validate(function(value, next) {
  return new Promise(function (resolve, reject) {
    User.findOne({email: value})
      .then(user => {
        if(user && this._id !== user._id) {
          reject(new Error("Email already taken by another user"))
        } else {
          resolve()
        }
      })
      .catch(err => {throw err})
  })
})

module.exports = User;