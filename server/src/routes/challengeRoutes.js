const express = require('express');
const challengeController = require('../controllers/challengeContoller'); 

const router = express.Router();

router.post('/create', challengeController.createChallenge);
router.get('/list', challengeController.listChallenges);
router.get('/:id', challengeController.getChallengeById);
router.put('/update/:id', challengeController.updateChallenge);
router.delete('/delete/:id', challengeController.deleteChallenge);

module.exports = router;
