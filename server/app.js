if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))


const userRoute = require('./routes/userRoute')
const articleController = require('./controllers/articleController')
const authentication = require('./middleware/authentication')
const authorization = require('./middleware/authorization')
const fileUpload = require('./middleware/uploadFile')

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message : 'API server is running'
  })
})
app.use('/user', userRoute)
app.get('/dashboard', authentication, articleController.showArticle)
app.post('/addArticle', authentication, fileUpload, articleController.addArticle)
app.delete('/deleteArticle/:articleId', authentication, authorization, articleController.deleteArticle)
app.put('/updateArticle/:articleId', authentication, authorization, articleController.updateArticle)


app.use((err, req, res, next) => {
  console.log(err)
  const message = err.message || 'Internal server error'
  const status = err.status || 500

  res.status(status).json({
    message
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})