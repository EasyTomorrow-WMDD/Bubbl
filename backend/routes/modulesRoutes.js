const express = require('express');
const router = express.Router();
const { getAllModules } = require('../controllers/modulesController');

router.get('/', getAllModules);

module.exports = router;