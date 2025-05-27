const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const router = express.Router();

router.get('/topRecordings', analyticsController.getTopRecs);

module.exports =router;