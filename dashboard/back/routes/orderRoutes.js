const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to update an order's status
router.patch('/:id', orderController.updateOrderStatus);

module.exports = router;
