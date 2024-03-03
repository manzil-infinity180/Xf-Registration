const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const registerRoute = require("./router/registerRoute");
const googleRoute = require("./router/googleRoute");
const githubRoute = require("./router/githubRoute");
const path= require('path');
const cors = require('cors');
const cloudinary = require("cloudinary").v2;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["https://xf-frontend.onrender.com/"],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"], 
  credentials:true
}));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// console.log(cloudinary.config())
cloudinary.config({
  secure: true
});

// app.use('/user/auth/github',
//   session({
//     resave:false,
//     saveUninitialized:true,
//     secret : process.env.CLIENT_SECRET_GITHUB,
//   })
// );
// app.use('/user/auth/google',
//   session({
//     resave:false,
//     saveUninitialized:true,
//     secret : process.env.CLIENT_SECRET,
//   })
// );

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

app.use('/user/auth/google',googleRoute);
app.use('/user/auth/github',githubRoute);

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
    passport.authenticate('github')
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect or respond as needed.
        res.
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {
    // Access user information using req.user
    res.json(req.user);
});
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.urlencoded({ extended: false }));

module.exports=app;