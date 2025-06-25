const express = require('express');
const router = express.Router();

// Import the controller and middleware functions
const { 
  checkUserExists, 
  registerUser, 
  getUserProfiles, 
  addProfile, 
  getChildById,
  getChildProfiles,
  updateDayStreak,
  getChildUserStats,
  addStars,
} = require('../controllers/userController');

const verifySupabaseToken = require('../middleware/verifySupabaseToken');

// Debugging middleware to log incoming requests. 
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.originalUrl}`);
  next();
});

// Static routes. 
router.get('/exists', verifySupabaseToken, async (req, res) => {
  const user = req.user;
  console.log('[✅ BACKEND] Token verified, user:', user.email);
  res.json({ exists: true });
});  // Route to check if a user exists
router.post('/registerUser', verifySupabaseToken, registerUser); // Route to register a new user or add an existing user to an account
router.get('/profiles', verifySupabaseToken, getUserProfiles);  // Route to get user profiles for an account
router.post('/addProfile', verifySupabaseToken, addProfile); // Route to add a new profile for a user
router.get('/getChildProfiles', verifySupabaseToken, getChildProfiles); // Route to get all child profiles for the authenticated user
router.post('/updateDayStreak', verifySupabaseToken, updateDayStreak); // Route to update the day streak for a child profile

// Dynamic routes. 
// IMPORTANT! Make sure that static routes are defined before dynamic ones.
router.get('/:userId/stats', verifySupabaseToken, getChildUserStats); // Route to get child user stats by user_id
router.get('/:userId', verifySupabaseToken, getChildById); // Route to get a child by user_id

module.exports = router;
