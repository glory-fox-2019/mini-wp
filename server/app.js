const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser: true});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const articleRouter = require('./routes/article-router')

app.use('/article', articleRouter)

app.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500
    }
    res.send(err.status).json({message: err.message})
})

app.listen(PORT, () => console.log("listening to port" + PORT))