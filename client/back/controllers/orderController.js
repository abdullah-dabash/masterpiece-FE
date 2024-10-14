const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

// Create an Order
exports.createOrder = async (req, res) => {
  const { total, items } = req.body; // Destructure items from the request body
  try {
    const order = new Order({
      user: req.user._id,
      total,
      items, // Include items here
      status: 'Pending' // Set initial status
    });

    await order.save();
    res.json({ orderID: order._id, total });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Capture Payment
exports.captureOrder = async (req, res) => {
  const { orderID } = req.body;
  try {
    const order = await Order.findById(orderID);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'Paid';
    await order.save();

    res.json({ message: 'Order captured successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error capturing order', error });
  }
};
