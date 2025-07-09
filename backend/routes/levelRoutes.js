const express = require('express');
const router = express.Router();
const { levelUp } = require('../controllers/levelController');

// POST /api/users/:user_id/level
to=controllers/levelController.js
router.post('/users/:user_id/level', levelUp);

module.exports = router;