if(!process.env.NODE_ENV || process.env.DEV == 'development'){
     require('dotenv').config()
 }
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser:true})
.then(()=> {
     console.log('Database connected')
})
.catch(err => {
     console.log(err)
     console.log('Database failed to connect')
})
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
app.use('/', routes);
app.use(errorHandler)
app.listen(port, function() {
     console.log('App listening on port', port);
})