const express = require('express');
const router = express.Router();

const verifySupabaseToken = require('../middleware/verifySupabaseToken');
const drawingController = require('../controllers/drawingController');

router.post('/upload', verifySupabaseToken, drawingController.uploadDrawing);

router.get('/getByChild/:userId', verifySupabaseToken, drawingController.getDrawingsByChild);


module.exports = router;