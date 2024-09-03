const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
};
