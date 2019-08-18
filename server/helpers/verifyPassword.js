const bcrypt = require('bcryptjs')

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}


module.exports = verifyPassword