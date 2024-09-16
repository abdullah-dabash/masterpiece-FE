const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null  // Use default: null if you want to handle cases where the image might not be available
  },
  modelUrl: {
    type: String,
    default: null  // Similarly, handle cases where the model might not be provided
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
