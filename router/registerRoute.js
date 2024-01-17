const express = require('express');
const router = express.Router();
const registerController = require("./../controller/registerController");

router.get('/login',registerController.login);
router.post('/register',registerController.getRegistered);

router.use(registerController.isAuthenticated);
router.get('/',registerController.getAllRegisterd);

router.get('/search',registerController.searchPerson);
router.get('/skill',registerController.searchBySkill);
router.get('/find-user-within-radius',registerController.findUserWithinRadius);
router.patch('/update-my-detail/:id',registerController.uploadUserPhoto
,registerController.updateMyDetail);
router.delete('/delete-registee',registerController.deleteRegistee);

router.patch('/updatePhoneNumber',registerController.updatePhoneNumber);
router.patch('/updateUsername',registerController.updateUsername);
router.patch('/upload-userphoto',registerController.uploadUserPhoto
,registerController.updateMe);
router.patch('/upload-bgimg',registerController.uploadBackgroundPhoto
,registerController.updateMe);
router.get('/user-detail',registerController.getMe);
router.get('/logout',registerController.logout);



module.exports=router;