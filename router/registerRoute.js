const express = require('express');
const router = express.Router();
const registerController = require("./../controller/registerController");

router.get('/',registerController.getAllRegisterd);
router.post('/register',registerController.getRegistered);
router.get('/search',registerController.searchPerson);
router.get('/skill',registerController.searchBySkill);
router.get('/find-user-within-radius',registerController.findUserWithinRadius);
router.patch('/update-my-detail/:id',registerController.updateMyDetail)


module.exports=router;