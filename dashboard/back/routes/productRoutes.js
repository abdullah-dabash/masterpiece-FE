const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images');
    } else if (file.fieldname === 'model') {
      cb(null, 'uploads/models');
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Routes
router.post('/add', upload.fields([{ name: 'image' }, { name: 'model' }]), addProduct);
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'model' }]), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
