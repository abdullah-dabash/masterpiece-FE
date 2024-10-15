import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../nav';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ShoppingCart, Heart } from 'lucide-react';

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(new URLSearchParams(location.search).get('category') || '');
  const [priceRange, setPriceRange] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all', {
          params: { category, price: priceRange },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(`Error fetching products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, priceRange]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(`Error fetching categories: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/favorites', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFavorites(response.data.map(fav => fav._id));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    navigate(`?category=${selectedCategory}`);
  };

  const handlePriceChange = (e) => setPriceRange(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const toggleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      if (favorites.includes(productId)) {
        await axios.delete(`http://localhost:5000/api/favorites/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(favorites.filter(id => id !== productId));
      } else {
        await axios.post(`http://localhost:5000/api/favorites/add/${productId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
    hover: { 
      y: -10,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Product List</h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="border rounded-md py-2 pl-10 pr-4 w-full md:w-1/3"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border rounded-md py-2 pl-4 pr-4 w-full md:w-1/3"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={priceRange}
            onChange={handlePriceChange}
            className="border rounded-md py-2 pl-4 pr-4 w-full md:w-1/3"
          >
            <option value="">All Prices</option>
            <option value="0-50">0 - 50</option>
            <option value="50-100">50 - 100</option>
            <option value="100-200">100 - 200</option>
          </select>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border rounded-md py-2 pl-4 pr-4 w-full md:w-1/3"
          >
            <option value="">Sort by</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        <AnimatePresence>
          <motion.ul 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedProducts.map((product) => (
              <motion.li 
                key={product._id} 
                className="bg-white rounded-xl overflow-hidden shadow-md relative"
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <Link to={`/product/${product._id}`} className="block">
                  <img 
                    src={`http://localhost:4000/uploads/${product.imageUrl}`} 
                    alt={product.name} 
                    className="w-full h-40 object-cover" 
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-lg font-semibold">${product.price}</p>
                  </div>
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product._id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <Heart 
                    fill={favorites.includes(product._id) ? "red" : "none"} 
                    stroke={favorites.includes(product._id) ? "red" : "currentColor"}
                  />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductList;