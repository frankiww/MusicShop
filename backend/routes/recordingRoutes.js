const express = require('express');
const recordingController = require('../controllers/recordingController');
const router = express.Router();

router.get('/', recordingController.getAllRecordings);

module.exports = router;