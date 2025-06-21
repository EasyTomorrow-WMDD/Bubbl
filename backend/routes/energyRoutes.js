const express = require('express');
const router = express.Router();
const { getEnergyStatus, reduceEnergy } = require('../controllers/energyController');

router.get('/status', getEnergyStatus);
router.post('/reduce', reduceEnergy);



module.exports = router;
