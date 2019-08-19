if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes/indexRoutes');
const errorHandling = require('./middleware/errorHandler');

// mongoosee
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/miniwp', { useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (!err) { 
        console.log(`connect mas eee`);
    } else {
        console.log(err);
    }
})

//cors & bodyparser
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app & error handling
app.use('/', router);
app.use(errorHandling);

// listen

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
})