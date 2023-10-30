const Register = require("./../model/registerModel");

exports.getAllRegisterd = async(req,res,next)=>{
  try{
    console.log(req.query.search);
    const allRegistee = await Register.find();
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
exports.getRegistered = async(req,res,next)=>{
  try{
    
    console.log(req.body);
    const registeredUser = await Register.create(req.body);
    console.log("New Registration \n "+registeredUser);
    res.status(200).json({
      staus:"Success",

      data:{
        registeredUser
      }
    })

  }catch(err){
    console.log(err.message);
    res.status(400).json({
      status:"Failed",
      data:{
        err:err.message
      }
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
exports.updateMyDetail = async(req,res,next)=>{
  try{
  console.log(req.body);
  console.log(req.params.id);
  const registee = await Register.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
      runValidators: true
  });
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