if(!process.env.NODE_DEV || process.env.NODE_DEV === 'development'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require('./middlewares/upload');

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/task_mini_wp', {useCreateIndex: true,useNewUrlParser: true})
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error Connecting to database | Error:'+err));

app.use('/api/posts', routes.posts);
app.use('/api/user', routes.user);

app.use('/',(req,res) => res.send('not Found'));

app.use(function(err,req,res,next){
  console.log(err);
  res.status(err.httpStatus || 500)
    .json({error: err.message || err});
})

app.listen(port, () => console.log('Successfully connected to server, PORT:'+port));