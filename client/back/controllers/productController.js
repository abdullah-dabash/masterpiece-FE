const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { search, category, price } = req.query;
    let filter = {};

    // Handle search
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Handle category
    if (category) {
      filter.category = category;
    }

    // Handle price range
    if (price) {
      const [minPrice, maxPrice] = price.split(',').map(p => parseFloat(p));
      filter.price = {};
      if (!isNaN(minPrice)) filter.price.$gte = minPrice;
      if (!isNaN(maxPrice)) filter.price.$lte = maxPrice;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};



const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
};
