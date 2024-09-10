const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the CartItem schema
const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
