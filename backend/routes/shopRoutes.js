const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopController');

router.get('/skins', controller.getAllSkinsByLevel);

module.exports = router;