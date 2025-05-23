const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.get('/', orderController.getAllOrders);

router.post('/create', orderController.makeOrder);

module.exports = router;