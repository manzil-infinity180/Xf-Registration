const express = require('express');
const router = express.Router();
const passport = require("passport");
// const session = require("express-session");
// const app = express();
const UserController = require("./../controller/userController");
// app.use(
//   session({
//     resave:false,
//     saveUninitialized:true,
//     secret : process.env.CLIENT_SECRET,
//   })
// );

// app.use(passport.session());
router.get('/',UserController.OAuthlogin);
// router.get('/callback',passport.authenticate('google', { failureRedirect: '/' }),  
// (req, res) => {
//   // Successful authentication, redirect or handle as needed
//   console.log("hello");
//   res.redirect('/profile');
// });
router.get('/callback',UserController.OAuthCallback,UserController.OAuthCallbackReq);

module.exports=router;