const express = require('express');
const router = express.Router();
const registerController = require("./../controller/registerController");

router.get('/login',registerController.login);

router.use(registerController.isAuthenticated);
router.get('/',registerController.getAllRegisterd);
router.post('/register',registerController.getRegistered);

router.get('/search',registerController.searchPerson);
router.get('/skill',registerController.searchBySkill);
router.get('/find-user-within-radius',registerController.findUserWithinRadius);
router.patch('/update-my-detail/:id',registerController.uploadUserPhoto
,registerController.updateMyDetail);
router.delete('/delete-registee/:id',registerController.deleteRegistee);

router.patch('/updatePhoneNumber/:id',registerController.updatePhoneNumber);
router.patch('/updateUsername/:id',registerController.updateUsername);
router.patch('/upload-userphoto/:id',registerController.uploadUserPhoto
,registerController.updateMe);
router.patch('/upload-bgimg/:id',registerController.uploadBackgroundPhoto
,registerController.updateMe);
router.get('/user-detail',registerController.getMe);
router.get('/logout',registerController.logout);



module.exports=router;