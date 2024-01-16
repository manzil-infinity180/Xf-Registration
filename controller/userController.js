const dotenv= require("dotenv");
dotenv.config({path:'./config.env'});
const passport = require("passport");
const session = require("express-session");
const app = require("./../app.js");

// const express = require("express");
// const app = express();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Middleware 

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },

  /*
  ************
  Google strategy also require verify callback , which contain accessToken , refershToken(optional),
  profile( authenticated user's Google profile
  The verify callback must call *cb* providing a user to complete authentication.)
   */

  
  (accessToken, refreshToken, profile, done) => { // done === cb (it is callback function)
    const option={
      accessToken,
      refreshToken,
      profile 
    };
    console.log(option);

    // User is authenticated. You can save user information in your database.


    // here done is nothing but it is callback(cb)
    return done(null, profile);
  }
));
 
passport.serializeUser(function(user,cb){
  return cb(null,user);
});
passport.deserializeUser(function(obj,cb){
  return cb(null,obj);
});
exports.OAuthlogin = passport.authenticate('google',{scope: ['https://www.googleapis.com/auth/plus.login']});
exports.OAuthCallback = passport.authenticate('google',{failureRedirect:'/'});
exports.OAuthCallbackReq = (req,res)=>{
  console.log("hello");
  res.redirect('/profile');
}






