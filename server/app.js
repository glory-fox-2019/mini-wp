require('dotenv').config()

const express  = require('express')
const app      = express()
const cors     = require('cors')
const morgan   = require('morgan')
const PORT     = process.env.PORT || 3000
const routes   = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0-yen5q.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser : true })
.then(() => {
    console.log(`Connect to mongoose database`)
})
.catch(err => {
    console.log(err)
})
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(PORT, () => {
    console.log('App listening on port', PORT)
})
