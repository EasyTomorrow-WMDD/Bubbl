const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopController');

router.get('/skins', controller.getAllSkinsByLevel);
router.get('/accesories', controller.getAllAccessories);
router.post('/buy', controller.postPurchaseAsset);
router.get('/owned', controller.getOwnedAssets);
router.post('/activate', controller.activateAsset)

module.exports = router;