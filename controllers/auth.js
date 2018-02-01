const jwt = require('jwt-simple');
let mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
const config = require('../config');


function genUserToken(user){
    let timeStamp = new Date().getTime();
    console.log('user is is',user.id)
    return jwt.encode({sub : user._id, iat: timeStamp},config.secret);
}

let User = require('../models/user')

exports.login = function(req,res,next){
    res.send({token : genUserToken(req.user)})
}

exports.signup = function(req,res,next){
   
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password) {
        res.send({err : "username or password must not be empty"})
    }
 
    User.findOne({'email': email},function(err,existingUser) {
        if(err){
            return next(err);
        }
        if(existingUser){
            return res.status(422).send({err : "user already exists"})
        }

        const newUser = new User({
            email: email,
            password : password
        })
        console.log(newUser)
        newUser.save((err) =>{
            if(err){return next(err)}
            res.json({token : genUserToken(newUser)});
        })
    })
}