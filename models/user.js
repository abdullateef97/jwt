let mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const bcrypt = require('bcrypt-nodejs');


let userSchema = mongoose.Schema({
    email : {type : String, unique : true, lowerCase : true},
    password : String
})


userSchema.pre('save',function(next) {
   
    const user = this;

    bcrypt.genSalt(10 , function(err,salt){
        bcrypt.hash(user.password, salt, null ,function(err,hash){
            if(err){
                console.log(err);
                return next(err)
            }
            user.password = hash;
            next();
        } )
    })

})

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){return cb(err)}

        cb(null, isMatch)
    })
}

let modelClass = mongoose.model('user',userSchema)
module.exports = modelClass;