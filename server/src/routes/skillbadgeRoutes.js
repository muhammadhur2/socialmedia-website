const express = require('express');
const skillBadgeController = require('../controllers/skillbadgeController');  // make sure to create this file
const { verifyToken } = require('../utils/jwtHelper');  // existing JWT verification utility

const router = express.Router();

// Routes related to SkillBadge
router.post('/create', verifyToken, skillBadgeController.createSkillBadge);

router.get('/list', verifyToken, skillBadgeController.listSkillBadges);
router.get('/:id', verifyToken, skillBadgeController.getSkillBadgeById);

router.put('/update/:id', verifyToken, skillBadgeController.updateSkillBadge);

router.delete('/delete/:id', verifyToken, skillBadgeController.deleteSkillBadge);

module.exports = router;
