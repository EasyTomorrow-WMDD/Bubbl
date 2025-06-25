const express = require('express');
const router = express.Router();
const {
  getAllBadgesWithUserStatus,
  saveUserBadges
} = require('../controllers/badgesController');


router.get('/users/:userId/badges', getAllBadgesWithUserStatus);
router.post('/users/:userId/badges/save', saveUserBadges);

module.exports = router;
