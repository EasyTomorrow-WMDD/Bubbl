const express = require('express');
const router = express.Router();
const {
  getEssentialsStoriesForUser,
  searchParentStories,
  getOneParentStory,
  markStoryAsRead,
  getRelatedStories,
} = require('../controllers/storyController');


const verifySupabaseToken = require('../middleware/verifySupabaseToken');

// Route: GET /api/stories/essentials/:user_id
router.get('/essentials/:user_id', verifySupabaseToken, getEssentialsStoriesForUser);
// Route: GET /api/stories/search
router.get('/search', verifySupabaseToken, searchParentStories);
// Route: GET /api/stories/getOneParentStory/:story_id
router.get('/getOneParentStory/:story_id', verifySupabaseToken, getOneParentStory);
// Route: POST /api/stories/markStoryAsRead
router.post('/markStoryAsRead', verifySupabaseToken, markStoryAsRead);
// Route: GET /api/stories/getRelatedStories/?type=:parent_story_type&exclude=:parent_story_id
router.get('/getRelatedStories', verifySupabaseToken, getRelatedStories);

module.exports = router;
