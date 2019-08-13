const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 3000
const articleRouter = require('./routes/articleRouter')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/mini-wp", { useNewUrlParser: true })
.then(success => {
    console.log('mongoose connected')
})
.catch(err => {
    console.log(err.message)
})


app.use('/articles', articleRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})

app.listen(PORT, (req, res) => {
    console.log(`connected to port ${PORT}`)
})