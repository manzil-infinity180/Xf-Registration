const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const registerRoute = require("./router/registerRoute");
app.use(express.json());

app.use('/api/v1',registerRoute);

app.use(express.urlencoded({ extended: false }));
module.exports=app;