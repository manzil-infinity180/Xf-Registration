const passport = require("passport");
const session = require("express-session");
// const app = require("./../app.js");
const express = require("express");
const app = express();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv= require("dotenv");
// Middleware 
// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: process.env.CALLBACK_URL,
// },
//   // VERIFY FUNCTION
//   (accessToken , refreshToken,profile,cb)=>{




//     return cb(null,profile);
//   }
dotenv.config({path:'./config.env'});

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
  
  
  

  
  // Session

app.use(
  session({
    resave:false,
    saveUninitialized:true,
    secret : process.env.CLIENT_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


app.get('/success', ensureAuthenticated, (req, res) => {
  // This route is protected and can only be accessed by authenticated users.
  // Add your logic here.
  res.send("Successfully login ");
});

app.get('/failure',(req,res)=>{
  res.send("Failed ---> check it out again");
});


