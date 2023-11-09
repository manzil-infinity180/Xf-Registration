const passport = require("passport");
const session = require("express-session");
const app = require("./../app.js");
const jwt = require("jsonwebtoken");
const userSchema = require("./../model/userModel.js");
// const express = require("express");
// const app = express();
const GithubStrategy = require('passport-github').Strategy;
const dotenv= require("dotenv");
// Middleware 
dotenv.config({path:'./config.env'});

// creating token using jwt 
const signToken = id => {jwt.sign({id},process.env.JWT_SECRET,{
  expireIn: new Date(Date.now() + 2*24*60*60*1000)
 })
};

const createSendToken = (user,res) =>{
  const token = signToken(user._id);
  // storing the token in cookie with the name 'jwt'
  res.cookie('jwt',token,{
    expires: new Date(Date.now() + 1*24*60*60*1000),
    httpOnly: true
  });

}


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

  
  async (accessToken, refreshToken, profile, done) => { // done === cb (it is callback function)
    console.log("Hello from github");
    const option={
      accessToken,
      refreshToken,
      profile 
    };
    console.log(profile);
    // console.log("JSON🤩✅"+option._json);
    

    const [photos] = profile.photos;

    // console.log();
    const user = await userSchema.create({
      displayName: profile.displayName,
      username: profile.username,
      profileUrl: profile.profileUrl,
      photo:photos.value,
      followers: profile._json.followers,
      following:profile._json.following
    });

    const token = signToken(user._id);
    console.log(token);
    createSendToken(user,res);

    // User is authenticated. You can save user information in your database.


    // here done is nothing but it is callback(cb)
    return done(null, user);
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









