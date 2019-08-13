if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 3000
const app = express()

mongoose.connect(`mongodb://localhost:27017/mini-wp`, { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => { res.send('selamat datang di mini-wp'); })
app.use('/mini-wp', routes)

app.listen(port, function () {
    console.log(`listening on port port`)
})