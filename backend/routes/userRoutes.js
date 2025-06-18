const express = require('express');
const router = express.Router();

// Import the controller and middleware functions
const { 
  checkUserExists, 
  registerUser, 
  getUserProfiles, 
  addProfile 
} = require('../controllers/userController');

const verifySupabaseToken = require('../middleware/verifySupabaseToken');

router.get('/exists', /*verifySupabaseToken*/ checkUserExists);  // Route to check if a user exists
router.post('/registerUser', verifySupabaseToken, registerUser); // Route to register a new user or add an existing user to an account
router.get('/profiles', verifySupabaseToken, getUserProfiles);  // Route to get user profiles for an account
router.post('/addProfile', verifySupabaseToken, addProfile); // Route to add a new profile for a user

module.exports = router;
