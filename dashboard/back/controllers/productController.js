const Product = require('../models/Product');

// Add Product
const addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const imageUrl = req.files && req.files.image ? `/images/${req.files.image[0].filename}` : null;
  const modelUrl = req.files && req.files.model ? `/models/${req.files.model[0].filename}` : null;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
      modelUrl
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add product', error: err.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch product', error: err.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const imageUrl = req.files && req.files.image ? `/images/${req.files.image[0].filename}` : null;
  const modelUrl = req.files && req.files.model ? `/models/${req.files.model[0].filename}` : null;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      category,
      imageUrl,
      modelUrl
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete product', error: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
