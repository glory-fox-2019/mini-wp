const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const articleRouter = require('./routes/article')
const userRouter = require('./routes/user')
const mongoose = require('mongoose');
const morgan = require('morgan')
const authentication = require('./middleware/authentication')
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/users', userRouter)
app.use(authentication)
app.use('/articles', articleRouter)
mongoose.connect('mongodb://localhost:27017/mini_wordpress', {useNewUrlParser: true})
.then(data => {
    console.log('success')
}).catch(err => {
    console.log('error')
})

app.use(function(err,req,res,next){
    res.json({
        status: res.status || 500,
        message: err.message || 'Error'
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))