const express = require('express');
const mediumController = require('../controllers/mediumController');
const router = express.Router();

router.get('/', mediumController.getAllMediums);

module.exports = router;