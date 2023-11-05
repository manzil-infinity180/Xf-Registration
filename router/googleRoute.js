const express = require('express');
const router = express.Router();


const UserController = require("../controller/userController");


router.get('/',UserController.OAuthlogin);
router.get('/callback',UserController.OAuthCallback,UserController.OAuthCallbackReq);



module.exports=router;