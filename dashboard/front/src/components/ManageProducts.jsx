import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './nav';

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Manage Products</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                {editProductId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleAddOrUpdateProduct}>
                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".glb,.gltf"
                      onChange={(e) => setNewProduct({ ...newProduct, model: e.target.files[0] })}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out"
                  >
                    {editProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={`http://localhost:4000${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                    <p className="text-gray-300 mt-2">${product.price}</p>
                    <p className="text-gray-400 mt-2">{product.description}</p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue active:bg-gray-300 transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageProducts;