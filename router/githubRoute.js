const express = require('express');
const router = express.Router();

const UserControllerGithub = require("../controller/userControllerGithub");


router.get('/',UserControllerGithub.OAuthlogin);
router.get('/callback',UserControllerGithub.OAuthCallback,UserControllerGithub.OAuthCallbackReq);

module.exports=router;