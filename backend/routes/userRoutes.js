const express = require('express');
const router = express.Router();

// Import the controller and middleware functions
const { 
  checkUserExists, 
  registerUser, 
  getUserProfiles, 
  addProfile, 
  getChildById
} = require('../controllers/userController');

const verifySupabaseToken = require('../middleware/verifySupabaseToken');

router.get('/exists', verifySupabaseToken, async (req, res) => {
  const user = req.user;
  console.log('[✅ BACKEND] Token verified, user:', user.email);
  res.json({ exists: true });
});  // Route to check if a user exists
router.post('/registerUser', verifySupabaseToken, registerUser); // Route to register a new user or add an existing user to an account
router.get('/profiles', verifySupabaseToken, getUserProfiles);  // Route to get user profiles for an account
router.post('/addProfile', verifySupabaseToken, addProfile); // Route to add a new profile for a user
router.get('/:userId', verifySupabaseToken, getChildById); // Route to get a child by user_id

module.exports = router;
