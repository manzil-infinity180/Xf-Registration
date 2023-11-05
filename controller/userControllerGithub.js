const passport = require("passport");
const session = require("express-session");
const app = require("./../app.js");
// const express = require("express");
// const app = express();
const GithubStrategy = require('passport-github').Strategy;
const dotenv= require("dotenv");
// Middleware 
dotenv.config({path:'./config.env'});

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: process.env.CALLBACK_URL_GITHUB,
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
exports.OAuthlogin = passport.authenticate('github',{scope: ['user:email']});
exports.OAuthCallback = passport.authenticate('github',{failureRedirect:'/'});
exports.OAuthCallbackReq = (req,res)=>{
  console.log("hello");
  res.redirect('/profile');
}






