const express = require('express');
const challengeController = require('../controllers/challengeContoller'); 
const { verifyToken } = require('../utils/jwtHelper'); 

const router = express.Router();

router.post('/create', verifyToken, challengeController.createChallenge);
router.get('/list', verifyToken, challengeController.listChallenges);
router.get('/:id', verifyToken, challengeController.getChallengeById);
router.put('/update/:id', verifyToken, challengeController.updateChallenge);
router.delete('/delete/:id', verifyToken, challengeController.deleteChallenge);

router.get('/byTag/:tag', verifyToken, challengeController.getChallengesByTag);
router.get('/byAuthor/:authorId', verifyToken, challengeController.getChallengesByAuthor);
router.get('/byComplexity/:complexity', verifyToken, challengeController.getChallengesByComplexity);

module.exports = router;
