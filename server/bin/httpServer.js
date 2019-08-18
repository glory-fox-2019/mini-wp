const http = require('http')
const app = require('../app')

const srv = http.createServer(app)

srv.listen(process.env.PORT, () => console.log('Connected to http server'))

