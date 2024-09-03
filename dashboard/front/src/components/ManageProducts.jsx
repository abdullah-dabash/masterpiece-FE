import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/products/add', newProduct);
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', price: '', description: '', category: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
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
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">Add Product</button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <ul className="bg-white p-6 rounded-lg shadow-lg">
        {products.map((product) => (
          <li key={product._id} className="border-b last:border-b-0 py-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ManageProducts;
