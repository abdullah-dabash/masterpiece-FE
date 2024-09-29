import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../nav';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, DollarSign, ShoppingCart, Heart } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/all');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(`Error fetching products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/all');
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(`Error fetching categories: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.price - b.price;
    }
    if (sortOrder === 'high-to-low') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleSearch = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  if (loading) return (
    <motion.div 
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  if (error) return (
    <motion.p 
      className="text-center text-black text-2xl mt-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error}
    </motion.p>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-black"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          Product List
        </motion.h1>
        
        <motion.div 
          className="mb-8 flex flex-col md:flex-row gap-4 justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="border border-black rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative w-full md:w-1/3">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border border-black rounded-md py-2 pl-10 pr-4 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-1/3">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border border-black rounded-md py-2 pl-4 pr-4 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Sort by Price</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </motion.div>
        
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
                className="bg-white rounded-xl overflow-hidden shadow-md"
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <Link to={`/product/${product._id}`} className="block">
                  <div className="relative">
                    <motion.img
                      src={`http://localhost:4000/uploads/${product.imageUrl}`}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute top-0 right-0 bg-black text-white px-3 py-1 m-2 rounded-full text-sm font-semibold flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <DollarSign size={16} className="mr-1" />
                      {product.price}
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-black">{product.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <motion.button 
                        className="bg-black text-white px-4 py-2 rounded-full flex items-center"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </motion.button>
                      <motion.button
                        className="text-black hover:text-red-500"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={24} />
                      </motion.button>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductList;
