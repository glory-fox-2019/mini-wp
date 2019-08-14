const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt')
const userSchema = new mongoose.Schema({
  name: {
    type:String,
  },
  username: {
    type:String,
    unique: true,
  },
  password: {
    type:String,
  },
  email: {
    type:String,
    unique: true,
  },
  role: String,
},{
  versionKey: false,
  timestamps: true,
})

userSchema.pre('save', function(){
  this.password = bcrypt.hashPassword(this.password);
});

const User = mongoose.model('Users', userSchema);

module.exports = User;