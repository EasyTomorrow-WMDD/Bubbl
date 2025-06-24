const express = require('express');
const router = express.Router();
const controller = require('../controllers/ShopController');

router.get('/skins', controller.getAllSkinsByLevel);
router.get('/accesories', controller.getAllAccessories);

module.exports = router;