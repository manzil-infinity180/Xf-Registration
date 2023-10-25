const mongoose = require("mongoose");
const validator = require('validator');
const registerSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Registration without Name is NOT Possible']
  },
  age:{
    type:Number,
    required:[true,'Age is Required Option']
  },
  email:{
    type:String,
    required:[true,'User cannot without emailId'],
    unique:[true,'User Already exist with this email'],
    lowercase:true,
    validate : [validator.isEmail,'Please Provide Valid Email'],
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  username:{
    type:String,
    required:[true,'UserName is Required Field'],
    unique:[true,'Username should be unique! Try another one']
  },
  college:{
    type:String
  },
  address:{
    type:String,
    required:[true,'Address is Required Field']
  },
  position:{
    type:String,
    required:[true,'Any tag like student,profession dev,senior dev,etc']
  },
  image:{
    type:String
  },
  bgimg:{
    type:String
  },
  social:{
    type:String
  },
  phoneNumber:{
    type:Number
  },
  time:{
    type:Date,
    default: Date.now()
  }
})

const Register = mongoose.model('Register',registerSchema);
module.exports=Register;