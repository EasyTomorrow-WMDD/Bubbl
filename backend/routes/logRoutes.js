const express = require('express');
const router = express.Router();

// Import the controller and middleware functions
const { 
  postChildActivityLog,
  getChildActivityLog,
} = require('../controllers/logController');

const verifySupabaseToken = require('../middleware/verifySupabaseToken');

// Debugging middleware to log incoming requests. 
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.originalUrl}`);
  console.log('[verifySupabaseToken] headers:', req.headers.authorization);

  next();
});

console.log('[ROUTER] getChildActivityLog =', typeof getChildActivityLog);

router.get('/getChildActivityLog', verifySupabaseToken, getChildActivityLog); // Route to get user activity log
router.post('/childActivityLog', verifySupabaseToken, postChildActivityLog); // Route to log user activity

module.exports = router;
