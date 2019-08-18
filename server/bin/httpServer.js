const http = require('http')
const app = require('../app')

const srv = http.createServer(app)
const port = process.env.PORT

srv.listen(port, () => console.log('Connected to http server on port: ', port ))

