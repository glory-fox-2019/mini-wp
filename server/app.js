require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true});

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const articleRouter = require('./routes/article-router')
const userRouter = require('./routes/user-router')

app.get('/', (req, res) => {
    res.send('test')
})

app.use('/user', userRouter)
app.use('/articles', articleRouter)

app.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500
    }
    res.status(err.status).json({message: err.message})
})

app.listen(PORT, () => console.log("listening to port" + PORT))