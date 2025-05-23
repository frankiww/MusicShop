const express = require('express');
const recordingController = require('../controllers/recordingController');
const router = express.Router();

router.get('/', recordingController.getAllRecordings);

router.get('/:id', recordingController.getRecordingById);

router.get('/:id/available', recordingController.availableShops);

router.get('/:id/unavailable', recordingController.unavailableShops);


module.exports = router;