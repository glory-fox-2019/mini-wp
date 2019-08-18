if(!process.env.NODE_ENV || process.env.NODE_END == "development"){
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const route = require('./routes/index')


const port = process.env.PORT || 3000
const db_url = process.env.DB_URL


app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect(db_url,{useNewUrlParser : true})
.then(function(){
    console.log('db connected')
})
.catch(function () {
    console.log('fail to connect')
})


app.use('', route)
app.use((err, req, res, next) => {
    const { start, httpStatus, message, previousError, stack } = err
    console.log(stack);
  
    res.status(httpStatus || 500).json({
      status: false,
      code: httpStatus || 500,
      message,
      data: previousError,
    })
  });



app.listen(port,function (){
    console.log('Jalan di port : '+port)
})

