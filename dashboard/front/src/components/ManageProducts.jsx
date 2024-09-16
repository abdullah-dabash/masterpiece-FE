import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';

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
  const [error, setError] = useState(null); // State for error messages

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
        // Update product
        await axios.put(`http://localhost:4000/api/products/${editProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProducts(products.map(product => (product._id === editProductId ? { ...newProduct, _id: editProductId } : product)));
        setEditProductId(null);
      } else {
        // Add new product
        const response = await axios.post('http://localhost:4000/api/products/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProducts([...products, response.data]);
      }

      setNewProduct({ name: '', price: '', description: '', category: '', image: null, model: null });
      setError(null); // Clear any previous errors
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
        <form onSubmit={handleAddOrUpdateProduct} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">{editProductId ? 'Edit Product' : 'Add New Product'}</h2>
          
          {/* Product Form Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              id="name"
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              id="category"
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">3D Model</label>
            <input
              id="model"
              type="file"
              accept=".glb,.gltf"
              onChange={(e) => setNewProduct({ ...newProduct, model: e.target.files[0] })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
            {editProductId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        {/* Product Cards */}
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <img src={`http://localhost:4000${product.imageUrl}`} alt={product.name} className="h-40 w-full object-cover mb-4 rounded" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-500">{product.description}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
