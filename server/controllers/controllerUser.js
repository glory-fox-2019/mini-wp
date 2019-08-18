const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const User = require('../models/User')

class controllerUser{
    static dataUser(req,res,next){
        User.findById(req.decoded._id)
        .then(data=>{
            let dataSend = {
                name : data.name,
                email : data.email
            }
            res.json(dataSend)
        })
        .catch(err=>{
            next(err)
        })
    }
    static create(req,res,next){
        let {name,email,password} = req.body
        password = bcrypt.hashPassword(password)
        User.create({
            name,
            email,
            password
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static login(req,res,next){
        const{email,password} = req.body
        User.findOne({email})
            .then(data=>{
                if(data){
                    if(bcrypt.comparePassword(password,data.password)){
                        const {_id, name,email,birthday_date} = data
                        req.headers.token = jwt.generateToken({_id,name,email,birthday_date})
                        res.json({token : req.headers.token})
                    }else{
                        res.status(404).json({message : 'invalid password/username'})
                    }  
                }else{
                    res.status(404).json({message : 'invalid password/username'})
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static googleLogin(req,res,next){
        const {token} = req.body
        console.log(token);
        console.log(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken : token,
            audience : process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload();
            console.log(payload);
            User.findOne({
                email : payload.email
            })
            .then(user=>{
                if(user){
                    console.log('data ada di db')
                    const {name,email,_id} = user
                    return {name,email,_id}
                }else{
                    console.log('membuat data')
                    const {name,email} = payload
                    User.create({
                        name,
                        email,
                        password : bcrypt.hashPassword(process.env.DEFAULT_PASSWORD)
                    })
                    .then(data=>{
                        const {name,email,_id} = data
                        return {name,email,_id}
                    })
                   
                }
            })
            .then(data=>{
                let tokenCreated = jwt.generateToken(data)
                req.headers.token = tokenCreated
                res.json(req.headers.token)
                console.log(req.headers.token);
            })
            
        })
        .catch(err=>next(err))
    }

}

module.exports = controllerUser