const express = require('express');
const saleConroller = require('../controllers/saleConroller');
const router = express.Router();

router.get('/', saleConroller.getAllSales);

module.exports = router;