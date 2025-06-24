const express = require('express');
const router = express.Router();
const controller = require('../controllers/childProgressController');


router.get('/dashboard/:userId', controller.getDashboard);
router.get('/modules', controller.getAllModulesAndTopics);
router.get('/userProgress/:userId', controller.getChildProgress);
router.get('/userAvatar/:userId', controller.getChildAvatar);

module.exports = router;
