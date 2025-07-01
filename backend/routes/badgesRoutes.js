const express = require('express');
const router = express.Router();
const { getAllBadgesWithUserStatus, saveUserBadges, awardBadgeToUser } = require('../controllers/badgesController');

router.get('/:userId/badges', getAllBadgesWithUserStatus);
router.post('/:userId/badges/save', saveUserBadges);
router.post('/:userId/badges', awardBadgeToUser);

module.exports = router;
