const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');

router.get('/status', onboardingController.getOnboardingStatus);
router.post('/complete', onboardingController.completeOnboarding);

module.exports = router;
