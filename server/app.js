// if (process.env.NODE_ENV == 'development') {
//     require('dotenv').config()
// }

const env = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/mini-wp-porto', {useNewUrlParser: true})
.then(() => {
    console.log('mongo connected')
})
.catch((err) => {
    console.log(err)
})

const articles = require('./routes/articles')
const user = require('./routes/user')
app.use('/articles', articles)
app.use('/user', user)

function errorHandler (err, req, res, next) {
    console.log(err)
    res.status(500).json({
        message: 'Internal server error'
    })
}
app.use(errorHandler)

app.listen(port, () => console.log(`Hello from port : ${port}! 😙`))