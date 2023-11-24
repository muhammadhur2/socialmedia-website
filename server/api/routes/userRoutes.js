const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../utils/jwtHelper');
const { updateProfile, getProfile, deleteAccount } = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:userId', getProfile);
router.get('/profile', verifyToken, getProfile);
router.put('/updateProfile', verifyToken, updateProfile);
router.delete('/deleteAccount', verifyToken, deleteAccount);


router.post('/sendfriendrequest', verifyToken, userController.sendFriendRequest);
router.post('/acceptfriendrequest', verifyToken, userController.acceptFriendRequest);
router.post('/rejectfriendrequest', verifyToken, userController.rejectFriendRequest);
router.get('/listfriends', verifyToken, userController.listFriends);
router.get('/listfriendrequests', verifyToken, userController.listFriendRequests);
router.get('/searchFriends', verifyToken, userController.searchFriends);


module.exports = router;
