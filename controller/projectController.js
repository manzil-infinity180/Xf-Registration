const Profile = require("../model/projectModel");
const Register = require("../model/registerModel");
const  multer =  require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});
const cloudinary = require("cloudinary").v2;
exports.uploadProjectimg = upload.single('projectimg');
exports.postProject = async(req,res,next)=>{
    try{
      let profile;
      console.log(req.file);
      if(req.file){
        console.log(req.file)
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        let result = await cloudinary.uploader.upload(dataURI,{
          folder:"projectimg"
        });
        console.log(result);
         project = await Profile.create({
          "title":req.body.title,
          "description":req.body.description,
          "techstack":req.body.techstack,
          "repolink":req.body.repolink,
          "deployed":req.body.deployed,
          "projectimg":result.url
        });
       
      }else{
        project = await Profile.create(req.body);

      }
      console.log(project);
      const user = await Register.findById(req.user);
      console.log(user);
      user.project.unshift(project._id);
      await user.save();

      res.status(200).json({
        status:"Sucess",
        message:"Project added successfully",
        data:{
            project
        }
      })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message:err.message
        })
    }

}
exports.deletePost = async(req,res,next)=>{
  try{
    const id = req.params.id;
    console.log(id);
    const data = await Profile.deleteOne({_id:id});
    
    res.status(200).json({
      status:"Sucess",
      message:"Project deleted successfully",
      data:{
        data
      }
    })

  }catch(err){
    res.status(404).json({
      status:"Failed",
      message:err.message
  })
  }
}
exports.updatePost = async(req,res,next)=>{
  try{
    const id = req.params.id;
    console.log(id);
    const data = await Profile.findByIdAndUpdate({_id:id},req.body);
    
    res.status(200).json({
      status:"Sucess",
      message:"Project updated successfully",
    })

  }catch(err){
    res.status(404).json({
      status:"Failed",
      message:err.message
  })
  }
}
exports.getPostById = async(req,res,next)=>{
  try{
    const id = req.params.id;
    console.log(id);
    const data = await Profile.findById(id);
    
    res.status(200).json({
      status:"Sucess",
     data
    })

  }catch(err){
    res.status(404).json({
      status:"Failed",
      message:err.message
  })
  }
}