const express = require('express');
const router = express.Router();
const {
  getAllTopics,
  getTopicsByModule,
  getTopicById,
  addTopic
} = require('../controllers/topicsController');

router.get('/', getAllTopics);
router.get('/module/:moduleId', getTopicsByModule);
router.get('/:id', getTopicById);
router.post('/add', addTopic);

module.exports = router;