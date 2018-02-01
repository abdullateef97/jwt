const express = require('express');
let router = express();
let auth = require('./controllers/auth')
let passportService = require('./services/passport');
let passport = require('passport');

let requireAuth = passport.authenticate('jwt',{session : false})
let requireLogin = passport.authenticate('local',{session : false});
router.get('/',requireAuth, (req,res,next)=>{
    res.send({message : "Damn its another Day!!!"});
})

router.post('/signin',requireLogin, auth.login)
router.post('/signup',auth.signup)










module.exports = router;