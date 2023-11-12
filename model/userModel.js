const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName:{
    type:String,
    required:[true,'Registration without Name is NOT Possible']
  },
  username:{
    type:String,
    // unique:[true,'Username should be unique! User already Exist']
  },
  profileUrl:{
    type:String
  },
  photo:{
    type:String
  },
  followers:{
    type:Number
  },
  following:{
    type:Number
  }

  
});



const User = mongoose.model('User',userSchema);
module.exports=User;