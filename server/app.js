if(!process.env.NODE_DEV || process.env.NODE_DEV === 'development'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task_mini_wp', {useNewUrlParser: true})
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error Connecting to database | Error:'+err));


app.use('/api/posts', routes.posts);
app.use('/api/user', routes.user);

app.use('/',() => res.send('not Found'));

app.use(function(err,req,res,next){
  res.status(500 || err.httpStatus)
    .json({error: err.message || err});
})

app.listen(port, () => console.log('Successfully connected to server, PORT:'+port));