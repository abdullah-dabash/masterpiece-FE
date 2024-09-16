const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Add item to cart
exports.addItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let item = await CartItem.findOne({ productId });

    if (item) {
      // Item exists, update quantity
      item.quantity += quantity;
      await item.save();
    } else {
      // New item, add to cart
      item = new CartItem({ productId, quantity });
      await item.save();
    }

    const cartItems = await CartItem.find().populate('productId');
    res.json({ message: 'Item added to cart', cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Get all items in the cart
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

// Update item quantity in the cart
exports.updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;

  try {
    const item = await CartItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;
    await item.save();

    const cartItems = await CartItem.find().populate('productId');
    res.json({ message: 'Cart item updated', cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity', error });
  }
};

// Remove item from the cart
exports.removeItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CartItem.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const cartItems = await CartItem.find().populate('productId');
    res.json({ message: 'Item removed from cart', cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

// Clear all items in the cart
exports.clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({});
    const cartItems = await CartItem.find().populate('productId');
    res.json({ message: 'Cart cleared', cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};
