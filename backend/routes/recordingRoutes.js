const express = require('express');
const recordingController = require('../controllers/recordingController');
const router = express.Router();

router.get('/', recordingController.getAllRecordings);

router.get('/inStore', recordingController.getRecordingsByStore);

router.get('/notInStore', recordingController.getRecordingsNotInStore);

router.get('/:id', recordingController.getRecordingById);

router.get('/:id/available', recordingController.availableShops);

router.get('/:id/unavailable', recordingController.unavailableShops);

router.delete('/:id', recordingController.deleteRecording);








module.exports = router;