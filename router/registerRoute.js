const express = require('express');
const router = express.Router();
const registerController = require("./../controller/registerController");
const projectController = require("./../controller/projectController");
router.post('/login',registerController.login);
router.post('/register',registerController.getRegistered);
router.get('/search/:username',registerController.getOtherUserDetail);
router.post('/verify',registerController.verify);

router.get('/',registerController.getAllRegisterd);
router.use(registerController.isAuthenticated);

router.get('/search',registerController.searchPerson);

router.get('/skill',registerController.searchBySkill);
router.get('/find-user-within-radius',registerController.findUserWithinRadius);
router.patch('/update-my-detail',registerController.uploadUserPhoto
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

// posting the project for the login in user 
router.post('/post-project',projectController.uploadProjectimg,projectController.postProject);
router.delete('/post-project/:id',projectController.deletePost);
router.patch('/post-project/:id',projectController.uploadProjectimg,projectController.updatePost);
router.get('/post-project/:id',projectController.getPostById);



module.exports=router;