const express = require('express');
const recordingController = require('../controllers/recordingController');
const router = express.Router();

router.get('/', recordingController.getAllRecordings);

router.get('/:id', recordingController.getRecordingById);

router.get('/:id/avaliable', recordingController.avaliableShops);

router.get('/:id/unavaliable', recordingController.unavaliableShops);


module.exports = router;