// const express = require('express');
// const router = express.Router();

// const verifySupabaseToken = require('../middleware/verifySupabaseToken');
// const drawingController = require('../controllers/drawingController');

// router.post('/upload', verifySupabaseToken, drawingController.uploadDrawing);
// router.get('/retrieve', verifySupabaseToken, drawingController.retrieveDrawings);

// router.get('/:user_profile_id', verifySupabaseToken, drawingController.getDrawingsByUser);
// router.get('/getByChild/:userId', verifySupabaseToken, drawingController.getDrawingsByChild);

// module.exports = router;



const express = require('express');
const router = express.Router();

const verifySupabaseToken = require('../middleware/verifySupabaseToken');
const drawingController = require('../controllers/drawingController');

router.post('/upload', verifySupabaseToken, drawingController.uploadDrawing);

router.get('/getByChild/:userId', verifySupabaseToken, drawingController.getDrawingsByChild);

// router.get('/list/:userId', verifySupabaseToken, drawingController.listDrawings);

module.exports = router;