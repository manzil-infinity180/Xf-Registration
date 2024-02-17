const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    title:{
        type:"String",
        required:[true,"Title of your project is mandatory"],
        
    },
    description:{
        type:"String",
        required:[true,"Description of your project is mandatory"]
    },
    techstack:{
        type:"String",
        required:[true,"Without tech stack how you created hahahaa!!"]
    },
    deployed:{
        type:"String",
    },
    repolink:{
        type:"String"
    },
    projectimg:{
        type:"String",
        default:"https://s3-ap-south-1.amazonaws.com/static.awfis.com/wp-content/uploads/2017/07/07184649/ProjectManagement.jpg"
    }
});

const Profile = mongoose.model('Profile',profileSchema);
module.exports=Profile;
