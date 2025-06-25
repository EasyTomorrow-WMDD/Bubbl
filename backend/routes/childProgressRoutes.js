const express = require('express');
const router = express.Router();
const controller = require('../controllers/childProgressController');


router.get('/dashboard/:userId', controller.getDashboard);
router.get('/modules', controller.getAllModulesAndTopics);
router.get('/userProgress/:userId', controller.getChildProgress);
router.post('/saveProgress', controller.saveProgress);

router.post('/saveDrawingProgress', controller.saveDrawingProgress);

module.exports = router;