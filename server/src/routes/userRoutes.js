const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../utils/jwtHelper');
const { updateProfile, getProfile, deleteAccount } = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', verifyToken, getProfile);
router.put('/updateProfile', verifyToken, updateProfile);
router.delete('/deleteAccount', verifyToken, deleteAccount);

module.exports = router;
