const express = require('express');
const router = express.Router();
const controller = require('../controllers/childProgressController');


router.get('/dashboard/:userId', controller.getDashboard);
router.get('/modules', controller.getAllModulesAndTopics);
router.get('/userProgress/:userId', controller.getChildProgress);
router.post('/saveProgress', controller.saveProgress);
router.get('/userAvatar/:userId', controller.getChildAvatar);
router.post('/saveDrawingProgress', controller.saveDrawingProgress);
router.get('/levels', controller.getRefLevel);
// router.post('/updateUserLevel', controller.updateUserLevel);


module.exports = router;