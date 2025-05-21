const express = require('express');
const artistController = require('../controllers/artistController');
const router = express.Router();

router.get('/', artistController.getAllArtists);

module.exports = router;