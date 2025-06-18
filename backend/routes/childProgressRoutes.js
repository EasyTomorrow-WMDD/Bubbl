const express = require('express');
const router = express.Router();
const controller = require('../controllers/childProgressController');
// const auth = require('../middleware/auth');

router.get('/dashboard', /*auth*/ controller.getDashboard);
router.get('/modules', controller.getAllModulesAndTopics);
router.get('/userProgress', controller.getAllModulesAndTopics);

module.exports = router;
