if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors')
const {
    errorHandler
} = require('./middlewares/errorHandler')

mongoose.connect('mongodb://localhost/mini-wp', {
    useNewUrlParser: true
});

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const articleRoute = require('./routes/article-route')
const userRoute = require('./routes/user-route')
const tagRoute = require('./routes/tag-route')

app.use('/users', userRoute)
app.use('/articles', articleRoute)
app.use('/tags', tagRoute)

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}`))