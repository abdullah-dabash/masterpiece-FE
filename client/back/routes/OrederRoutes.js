const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Order
router.post('/orders', authMiddleware, orderController.createOrder);

// Capture Payment
router.post('/orders/capture', authMiddleware, orderController.captureOrder);

module.exports = router;
