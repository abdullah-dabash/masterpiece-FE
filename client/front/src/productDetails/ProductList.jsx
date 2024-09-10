// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../nav';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all', {
          params: {
            search,
            category,
            price: price.trim(), // Ensure no leading/trailing spaces
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, price]);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all', {
          params: {
            // Fetch categories only
          },
        });
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9,]/g, '');
    setPrice(value);
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
        <div className="mb-4 flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md py-2 px-4 w-full md:w-1/3"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md py-2 px-4 w-full md:w-1/3"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Price range (min,max)"
            value={price}
            onChange={handlePriceChange}
            className="border border-gray-300 rounded-md py-2 px-4 w-full md:w-1/3"
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <li key={product._id} className="border border-gray-300 rounded-md shadow-md overflow-hidden">
              <Link to={`/product/${product._id}`} className="block p-4 hover:bg-gray-50">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">Price: ${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
