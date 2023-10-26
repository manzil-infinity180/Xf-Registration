const mongoose = require("mongoose");
const validator = require('validator');
var CryptoJs = require("crypto-js");

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
    unique:[true,'Username should be unique! Try another one']
  },
  college:{
    type:String
  },
  address:{
    type:String,
    required:[true,'Address is Required Field']
  },
  PostalCode:{
    type:String,
    required:[true,'Enter your nearby postal code'],
    maxlengt:32
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
  socialLink:{
    type:String
  },
  phoneNumber:{
    type:String
  },
  createdAt:{
    type:Date,
    default : Date.now()
  }
})

// Middleware for time to change like 25 August 2023 
registerSchema.pre('save',function(next){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = (new Date()).toLocaleDateString('en-US',options);
    this.time = formatDate*1;

    console.log(this.time);

  next();
});

registerSchema.pre('save',function(next){
  console.log(this.username);
  if(this.username===undefined){
  const letter = (this.name).toLowerCase().split(' ');
  let letter1 = letter[0].slice(0,1);
  let letter2 = letter[0].slice(1);
  let random = Math.floor(Math.random()*100000);
  let combined = letter1+"_"+letter2+random;
  this.username = combined;
  console.log(this.username);
  let letter3 = letter[1];

  if(letter3 !== undefined){
    letter3 = letter[1].slice(0,1);
    combined = letter1+letter3+random;
    this.username = combined;
  }
}
  next();
});

registerSchema.pre('save',function(next){
  const pNo= this.phoneNumber+'';
  console.log(pNo);
  const secret = process.env.CRYPTO_SECRET;
  // Encrypt 
  var ciphertext = CryptoJs.AES.encrypt(pNo,secret).toString();
  console.log(ciphertext);
  // decrypt 
  // var bytes = CryptoJs.AES.decrypt(ciphertext,secret);
  // var originalText = bytes.toString(CryptoJs.enc.Utf8);
  this.phoneNumber = ciphertext;
  console.log(this.phoneNumber);
  next();

})

const Register = mongoose.model('Register',registerSchema);
module.exports=Register;