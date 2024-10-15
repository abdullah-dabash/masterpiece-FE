import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './nav';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
    model: null
  });
  const [editProductId, setEditProductId] = useState(null);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/all');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);

    if (newProduct.image) formData.append('image', newProduct.image);
    if (newProduct.model) formData.append('model', newProduct.model);

    try {
      if (editProductId) {
        const response = await axios.put(
          `http://localhost:4000/api/products/${editProductId}`, 
          formData, 
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setProducts(products.map(product => 
          product._id === editProductId ? response.data : product
        ));
        setEditProductId(null);
      } else {
        const response = await axios.post(
          'http://localhost:4000/api/products/add', 
          formData, 
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setProducts([...products, response.data]);
      }

      setNewProduct({ name: '', price: '', description: '', category: '', image: null, model: null });
      setError(null);
    } catch (err) {
      console.error('Error uploading file:', err.response ? err.response.data : err.message);
      setError('Failed to upload product. Please check the file types and try again.');
    }
  };

  const handleEditProduct = (product) => {
    setEditProductId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: null,
      model: null
    });
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete product');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const inputVariants = {
    focus: { scale: 1.05, boxShadow: '0px 0px 8px rgba(255,255,255,0.5)' },
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="text-4xl font-bold text-white mb-8 text-center"
            >
              Manage Products
            </motion.h1>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded"
              >
                {error}
              </motion.p>
            )}
            
            <motion.div 
              ref={formRef}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                {editProductId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleAddOrUpdateProduct} className="space-y-4">
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.textarea
                  variants={inputVariants}
                  whileFocus="focus"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  type="file"
                  accept=".glb,.gltf"
                  onChange={(e) => setNewProduct({ ...newProduct, model: e.target.files[0] })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white rounded-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  {editProductId ? 'Update Product' : 'Add Product'}
                </motion.button>
              </form>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-semibold text-white mb-6 text-center"
            >
              Product List
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div 
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <div className="relative">
                      <img
                        src={`http://localhost:4000${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 m-2 rounded">
                        JD {product.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-300 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditProduct(product)}
                          className="px-4 py-2 bg-black text-white rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteProduct(product._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageProducts;