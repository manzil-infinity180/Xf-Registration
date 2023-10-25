const express = require('express');
const router = express.Router();
const registerController = require("./../controller/registerController");

router.get('/',registerController.getAllRegisterd);
router.post('/register',registerController.getRegistered);


module.exports=router;