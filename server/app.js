if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const port = process.env.PORT || 3000
const app = express()

mongoose.set('useCreateIndex', true)
mongoose
    .connect(process.env.MONGODB_CONECT, { useNewUrlParser: true })
    .then(success => {
        console.log('success connet to database');
    })
    .catch(err => {
        console.log(err, '<------ database error');
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

routes.get('/*', (req, res) => {
    res.status(404).json({ message: 'Page not found' })
})

app.listen(port, function () {
    console.log(`listening on port port ${port}`)
})