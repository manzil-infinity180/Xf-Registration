const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
const mongoose = require("mongoose");
const port = process.env.PORT;
const app = require("./app");
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);

mongoose.connect(DB,{
  useNewUrlParser:true
}).then(()=>{
  console.log("Successfully Connected to Database!");
});

app.listen(port,()=>{
  console.log(`Running on the port ${port}`);
})
