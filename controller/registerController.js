const Register = require("./../model/registerModel");
const CryptoJs = require("crypto-js");
const APIFeatures = require("./../utils/apiFeature");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sendEmail = require("./../utils/mailing.js");
const sendCookiesAndToken = require("../utils/sendCookiesAndToken");
const cloudinary = require("cloudinary").v2;
const dataUri = require("../utils/dataUri.js")
exports.getAllRegisterd = async(req,res,next)=>{
  try{
    // console.log(req.query.search);
    // console.log(req.query);
    // const allRegistee = await Register.find();
    const features = new APIFeatures(Register.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allRegistee = await features.query;

    // const feature = new APIFeature(Register.find(),req.query)
    //                  .filter()
    //                  .sort()
    //                  .limitFields()
    //                  .paginate();
    // const doc = await feature.query;

    // console.log(doc);
    res.status(200).json({
      status:"Success",
      result : allRegistee.length,
      data:{
        allRegistee
      }
    })
    
  }catch(err){
    console.log(err.message);
    res.status(404).json({
      status:"Failed",
      data:{
        err:err.message
      }
    })
    
  }
}
exports.getRegistered = async (req,res,next)=>{


try{
  const isUser = await Register.findOne({email:req.body.email});
  if(isUser){
    throw new Error("User already exist");
  }
  console.log(req.body);
  const registeredUser = await Register.create(req.body);
  console.log("New Registration \n "+registeredUser);
    // const Newuser = await Register.findOne({email :req.body.email});
 console.log(req.body.email);
 console.log(registeredUser);
 console.log(registeredUser.email);
 const checkDetail ={
  name: req.body.name,
  username: req.body.username,
  skill: req.body.OneTopSkill,

 }
 
     await sendEmail({
      email: req.body.email,
      subject : 'Xf Registration Successfully Done 🦾',
      message : 'Thank You for Xf registration,you can explore the Xf',
     })

     await sendCookiesAndToken(registeredUser,res);
     console.log(req.cookies);

    res.status(200).json({
      staus:"Success",
      data:{
        registeredUser
      }
    })

  }catch(err){
    res.status(400).json({
      status:"Failed",
      
        message:err.message
      
    })
  }
}

exports.searchPerson = async(req,res,next)=>{
  try{
    const searchedObj = await Register.find({$or : [{ username : req.query.username}, {name: req.query.name},
    {PostalCode: req.body.PostalCode},{college:req.query.college}]});
    console.log(searchedObj);
    res.status(200).json({
      status:"Success",
      data:{
        searchedObj
      }
    })

  }catch(err){
    res.status(400).json({
      status:"failed"
    })

  }
}
exports.searchBySkill = async(req,res,next)=>{
  try{
    console.log(req.query.skill);
    const searchedObj = await Register.find({OneTopSkill:req.query.skill});
    console.log(searchedObj);
    res.status(200).json({
      status:"Success",
      data:{
        searchedObj
      }
    })

  }catch(err){
    res.status(400).json({
      status:"failed"
    })

  }
}
exports.findUserWithinRadius = async(req,res,next)=>{
  try{

    const longitude = req.query.long;
    const latitude = req.query.lat;
    const radius = req.query.radius;
    console.log(req.query.radius,longitude,latitude);
    const options = {type:'Point',coordinates:[longitude,latitude]};
    // const radius = req.query.radius;
    const UserWithin = await Register.find({location:{
      $near : {
        $geometry:options,
        $maxDistance:radius 
        
      } }});
      res.status(200).json({
        status:'Success',
        length:UserWithin.length,
        data:{
          UserWithin
        }
      })
    }catch(err){
      res.status(400).json({
        status:'Failed',
        err:err.message
      })
    }
}


// Problem aa raha hai ----
exports.updatePhoneNumber=async(req,res,next)=>{
  try{
    console.log(req.body);
    const user = await Register.findById(req.user);
    // console.log(user);
    if(!user){
      throw new Error("No user found , check your _id");
    }
    console.log("Previous pass: "+req.body.previousPhoneNumber);
    if(!req.body.previousPhoneNumber){
      throw new Error("Firstly entered your Previous phone Number (previousPhoneNumber:889988xxxx)");
    }
    // const enteredPhoneNumber = req.body.previousPhoneNumber;
    const clipherText = user.phoneNumber; // phone number from database
   console.log("userPhone: "+clipherText);
    const bytes = CryptoJs.AES.decrypt(clipherText,process.env.CRYPTO_SECRET);
    const originalPhoneNumber = bytes.toString(CryptoJs.enc.Utf8);
    // console.log(user.phoneNumber);
    console.log("OriginalPass: "+ originalPhoneNumber);
    // if(req.body.previousPhoneNumber !== originalPhoneNumber){
    //   throw new Error("Your entered phone Number is not same with our database data,Entered correct Phone Number")
    // }
    const encryptedPhoneNumber = CryptoJs.AES.encrypt(req.body.phoneNumber,process.env.CRYPTO_SECRET).toString();
    // user.phoneNumber = req.body.phoneNumber;
    // console.log(user.phoneNumber);
    // user.save();
    // console.log("after save : "+ user.phoneNumber);
    const userUpdated = await Register.findByIdAndUpdate(user.id,{phoneNumber:encryptedPhoneNumber},{
      new:true,
      runValidators:true
    });
    

   res.status(200).json({
    status:"Success",
    data:{
      userUpdated
    }
    
   })
  }catch(err){
    res.status(404).json({
      status:"failed",
      err:err.message
    })

  }
}
exports.login = async (req,res,next) =>{
  try{
    const loginedUser = await Register.findOne({email: req.body.email});
    if(!loginedUser) {
      throw new Error("No account as been found with these Email-id.Try again!!");
    }

    await sendCookiesAndToken(loginedUser,res);
    // req.user = loginedUser;
    console.log(loginedUser);
    // console.log({
    //   id: loginedUser._id,
    //   email: loginedUser.email,
    //   username : loginedUser.username
    // })

    //   await sendEmail({
    //   email: req.body.email,
    //   subject : `Xf Login Sucessful ${loginedUser.username}`,
    //   message : `Welcome Back ${loginedUser.name} ,you are sucessfully logined in. 🤩`,
    //  })
    res.status(200).json({
      status:"Successfully Logined In",
      data:{
        loginedUser
      }
    })
    // console.log(loginedUser);


  }catch(err){
    res.status(400).json({
      status:"Failed",
      message : err.message
    })
     
  }
}
exports.getMe = async(req,res,next)=>{
  try{

    // const token = req.cookies.jwt;
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded)
     if(!req.user){
      throw new Error("first login");
     }
    const detail = await Register.findById(req.user).populate("project");
    // const detail = await Register.findById(decoded.id);
    res.status(200).json({
      status : "Successful",
      data: detail
    })

  }catch(err){
    res.status(400).json({
      status:"Failed",
      message : err.message
    })
  }
}
exports.getOtherUserDetail = async(req,res,next)=>{
  try{
    
    const params = req.params.username;
    const detail = await Register.findOne({username:params}).populate("project");
    // const detail = await Register.findById(decoded.id);
    res.status(200).json({
      status : "Success",
      data:{
        detail
      }
    });

  }catch(err){
    res.status(400).json({
      status:"Failed",
      message : err.message
    })
  }
}
exports.logout = async(req,res,next)=>{
  try{
    if(!req.user) throw new Error("You are already logout BRO!!!");
    res.clearCookie('jwt');
    res.status(200).json({
      status:"Success",
      data:"Successfully logout"
    })

  }catch(err){
    res.status(400).json({
      status:"Failed",
      message : err.message
    })
  }
}
exports.updateUsername = async (req,res,next)=>{
  try{
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded)
   
   // decoded.id ====> current logined user id 

  // const currentUser = await User.findById(decoded.id);
    if(!req.user) throw new Error("I checked you are not logined yet,Please register or login first");


    const user = await Register.findById(req.user);
    const lastUpdate = user.lastUpdate;
    const date = new Date();
    console.log(date.getTime()-lastUpdate.getTime() - 5*1*1*1000 + "  "+ date.getTime()+"  "+lastUpdate.getTime());
    // if(((date.getTime()-lastUpdate.getTime()) - 24 *60 * 60 * 1000) <=0){
    //   throw new Error("User can change their username onces in 24 hour");
    // }
    const updatedUser = await Register.findByIdAndUpdate(user.id,{username: req.body.username,
    lastUpdate:new Date()},{
      new:true,
      runValidators:true
    });
    
    
    console.log(user.username,user.lastUpdate);
    res.status(200).json({
      status:"Success",
      data:{
        updatedUser
      }
    })
  }catch(err){
    res.status(404).json({
      status:"failed",
      message:err.message
    })
  }
}

// Uploading image using multer npm package 
const diskStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/img');
  },
  filename:(req,file,cb)=>{
    // console.log(file);
    const extension = file.mimetype.split('/')[1];
    if(file.fieldname==='bgimg'){
      cb(null,`bgimg-${Date.now()}.${extension}`);
    }else{

      cb(null,`user-${Date.now()}.${extension}`);
    }
  }
});

const multerFile = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true);
  }else{
    cb(null,false);
  }
}
const storage = multer.memoryStorage();
const upload = multer({storage});

exports.uploadUserPhoto = upload.single('photo');
exports.uploadBackgroundPhoto = upload.single('bgimg');

exports.updateMe = async(req,res,next)=>{
  try{
    // console.log(req.file);
    console.log("hello");
    console.log(req.file);
    console.log(req.body);
    // const name = req.file.fieldname;
    let updateData = {};
    console.log(req.file);

    if(req.file){
      console.log("hyy");
    }
    // setting cloudinary 

    // const options = {
    //   use_filename: true,
    //   unique_filename: false,
    //   overwrite: true,
    // };
    // let imageURL = "default.jpg";

    // let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;
    const imageSize = 10 * 1024 * 1024;
    if(imageSize < req.file.size){
      throw new Error("Your file must be less than 10 MB")
    }
  if (req.file.fieldname === 'photo') {
  if (!updateData.photo) {
    console.log(req.file);
    
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // imageURL = req.file.filename;
    // let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;
    let result = await cloudinary.uploader.upload(dataURI,{
      folder:"photo"
    });
    
    
    // console.log(result);
  // updateData.image = req.file.filename;
    updateData.image = result.url;
  }
} 
// const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
// console.log(dataURI);
// imageURL = req.file.filename;
// let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;

    // const dataURI = dataUri.getDataUri(req.file);
    // let result = await cloudinary.uploader.upload(dataURI.content,{
    //   folder: "photo",
    // });
    
    
    // console.log(result);
  // updateData.image = req.file.filename;

    // updateData.image = result.url; 

  if (req.file.fieldname === 'bgimg') {
  if (!updateData.bgimg) {
    // imageURL = req.file.filename;
    // let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;
    // let result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(req.file)
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    let result = await cloudinary.uploader.upload(dataURI,{
      folder:"bgimg"
    });
    // updateData.bgimg = req.file.filename;
    updateData.bgimg = result.url;
  }
}
    console.log(updateData);
    const user = await Register.findByIdAndUpdate(req.user,updateData,{
      run:true,
      runValidators:true
    })
    res.status(200).json({
      status:'Success',
      Message:"Successfully uploaded images",
      // fieldname: req.file.fieldname,
      updateData
    })
  }catch(err){
    console.log(err);
    res.status(400).json({

      status:'Failed',
      err: err.message
    })
  }
}

exports.updateMyDetail = async(req,res,next)=>{
  try{
  console.log(req.body);
  console.log(req.params.id);
  console.log(req.file);
  if(req.body.username || req.body.phoneNumber){
    throw new Error('You can not update username(/updateUsername) & phoneNumber (/updatePhoneNumber) here, head over to following Url endpoints');
  }
  let registee;
  if(req.file){
    console.log("AA gaya bhai bol");
    let updateData = {};
    // if (req.file.fieldname === 'photo') {
    //   if (!updateData.photo) {
    //   updateData.image = req.file.filename;
    //   }
    // } else if (req.file.fieldname === 'bgimg') {
    //   if (!updateData.bgimg) {
    //     updateData.bgimg = req.file.filename;
    //   }
    // }
     registee = await Register.findByIdAndUpdate(req.user,{...req.body,updateData},{
      new:true,
      runValidators:true,
    })
  }else{
     registee = await Register.findByIdAndUpdate(req.user,req.body,{
      new: true,
        runValidators: true
    });
  }
  
  if(!registee){
    throw new Error("No User with this id found.Please enter valid id");
  }
  res.status(200).json({
    status:'Success',
    data:{
      registee
    }
  });
}catch(err){
  res.status(404).json({
    status:'Failed',
    err: err.message
  })
}
}
exports.deleteRegistee = async (req,res,next)=>{
  try{
    const user = await Register.findById(req.user);
    console.log(user);
    await sendEmail({
      email: user.email,
      subject : `Xf Account Deleted ${user.username}`,
      message : `Good Bye! ${user.name}, your account has been sucessfully deleted 🥲.\nWe regret to lose a USER!!!,we will work hard
      to make it better. Give Feedback and Suggestion to XF.\n \n Thank you \n Xf Community ❤️`,
     })
    await Register.deleteOne({_id: user._id});
    // clearing token
    res.clearCookie('jwt');
    res.status(200).json({
      status:"Success",
      message: `Registee with Username: ${user.username} is Deleted Account!`
    })

  }catch(err){
    console.log(err)
    res.status(404).json({
      status:"Failed",
     err: err.message
    })
  }
}

// we will use it as middleware 
exports.isAuthenticated = async (req,res,next) =>{
  try{
    let token;
    if(req.cookies.jwt){
      token = req.cookies.jwt;
    }
    console.log("token----->")
    console.log(token);
    if(!token){
      throw new Error("OOPs, Firstly you have to logined in !!");
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decode);
    const currentloginedUser = await Register.findById(decode.id);
    console.log(currentloginedUser);
    req.user = currentloginedUser;
    next();

  }catch(err){
    res.status(404).json({
      status:"Failed",
     err: err.message
    })
  }
}
