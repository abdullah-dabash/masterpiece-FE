const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to add an item to the cart
router.post('/add', cartController.addItem);

// Route to get all items in the cart
router.get('/', cartController.getCartItems);

// Route to update an item in the cart
router.put('/update/:id', cartController.updateItemQuantity);

// Route to remove an item from the cart
router.delete('/remove/:id', cartController.removeItem);

// Route to clear the cart
router.delete('/clear', cartController.clearCart);

module.exports = router;
