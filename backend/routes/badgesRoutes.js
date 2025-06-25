const express = require('express');
const router = express.Router();
const {
  getAllBadgesWithUserStatus,
  saveUserBadges
} = require('../controllers/badgesController');


router.get('/:userId/badges', getAllBadgesWithUserStatus);
router.post('/:userId/badges/save', saveUserBadges);

module.exports = router;
