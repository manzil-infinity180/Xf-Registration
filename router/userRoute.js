const express = require('express');
const router = express.Router();
const passport = require("passport");

const UserController = require("./../controller/userController");
const UserControllerGithub = require("./../controller/userControllerGithub");
router.get('/',UserController.OAuthlogin);

router.get('/callback',UserController.OAuthCallback,UserController.OAuthCallbackReq);
router.get('/',UserControllerGithub.OAuthlogin);
router.get('/callback',UserControllerGithub.OAuthCallback,UserControllerGithub.OAuthCallbackReq);

module.exports=router;