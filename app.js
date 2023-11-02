const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const registerRoute = require("./router/registerRoute");
const userRoute = require("./router/userRoute");
app.use(express.json());

app.use('/api/v1',registerRoute);
app.use('/user/auth/google',userRoute);

app.use(express.urlencoded({ extended: false }));
module.exports=app;