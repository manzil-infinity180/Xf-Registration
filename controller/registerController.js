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