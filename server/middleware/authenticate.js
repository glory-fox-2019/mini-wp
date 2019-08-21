const JWT = require('../helper/jwt');
const { User } = require('../models');

function authentication(req, res, next) {

    try {

        let decoded = JWT.verifyJwt(req.headers.token)

        User
            .findOne({
                email: decoded.email
            })
            .then(user => {
                req.decoded = decoded
                //req.headers.is = decoded.id
                next()
            })
            .catch(err => {
                res.status(401).json({
                    error: 'Autentication failed'
                })
            })
    }
    catch (err) {
        res.status(500).json(err)
    }

}

module.exports = authentication