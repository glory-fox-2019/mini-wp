if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const userRouter = require('./routes/userRouter')
const articleRouter = require('./routes/articleRouter')
const imageRouter = require('./routes/imageRouter')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect("mongodb+srv://billy:Thunder123@clustertype40-z9sli.mongodb.net/mini-wp?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(success => {
    console.log('mongoose connected')
})
.catch(err => {
    console.log(err.message)
})

app.use('/images', imageRouter)
app.use('/users', userRouter)
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