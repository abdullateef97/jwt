
const passport = require('passport'),
        JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt,
        config = require('../config'),
        User = require('../models/user');
const LocalStrategy = require('passport-local');

const localOptions = {usernameField : 'email'};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email}, (err, user) => {
        if(err){ return done(err)}

        if(!user){
            return done(null, false);
        }
        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err);

            if(!isMatch){
                return done(null,false)
            }
          return done(null, user);
        })
    })

})
        

const JwtOptions =  {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

const JwtLogin = new JwtStrategy(JwtOptions, function(payload , done){

    User.findById(payload.sub, function(err,user){
        if(err){ return done(err,false)}

        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
})

passport.use(JwtLogin);
passport.use(localLogin);