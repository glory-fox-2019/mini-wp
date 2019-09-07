if (NODE_ENV = "development"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/postingg', {useNewUrlParser: true}, function(err){
  if (err) throw err
  else console.log('mongoose connected')
})
// mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0-qtldw.gcp.mongodb.net/postingg?retryWrites=true&w=majority', {useNewUrlParser: true}, function(err){
//   if (err) throw err
//   else console.log('mongoose connected')
// })


//body parser and cors
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//routes and error handling
app.use('/', route)
app.use(errorHandler)

app.listen(port, ()=>{
  console.log('listening on port:'+port)
})