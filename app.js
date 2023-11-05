const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const registerRoute = require("./router/registerRoute");
const userRoute = require("./router/userRoute");
app.use(express.json());
app.use(
  session({
    resave:false,
    saveUninitialized:true,
    secret : process.env.CLIENT_SECRET_GITHUB,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1',registerRoute);
app.use('/user/auth/google',userRoute);
app.use('/user/auth/github',userRoute);

app.get('/success', (req, res) => {
  // This route is protected and can only be accessed by authenticated users.
  // Add your logic here.
  res.send("Successfully login ");
});

app.get('/failure',(req,res)=>{
  res.send("Failed ---> check it out again");
});
app.get('/profile',(req,res)=>{
  res.end("Hello Success!!");
});

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect or respond as needed.
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {
    // Access user information using req.user
    res.json(req.user);
});

app.use(express.urlencoded({ extended: false }));

module.exports=app;