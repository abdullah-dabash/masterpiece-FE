import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ image, title, price, isSoldOut }) => (
  <motion.div 
    className="relative group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-lg shadow-lg"
    />
    <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 text-black p-2 rounded">
      <h3 className="text-sm font-semibold truncate">{title}</h3>
      {isSoldOut ? (
        <span className="text-red-600 font-bold">Sold out</span>
      ) : (
        <span className="font-bold">{price} JOD</span>
      )}
    </div>
    {isSoldOut && (
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
        Sold out
      </div>
    )}
  </motion.div>
);

export default function Featured() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const featured = data.filter(item => item.category === 'featured');
        setFeaturedItems(featured);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <motion.div 
        className="container mx-auto p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg overflow-hidden mb-8">
          <img
            src="https://wallpaperaccess.com/full/5872521.jpg"
            alt="Horizon Forbidden West"
            className="w-full object-cover h-64"
          />
          <motion.div 
            className="absolute top-4 left-4 bg-white text-blue-500 px-4 py-2 rounded-full shadow-md font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            EXCLUSIVE
          </motion.div>
          <motion.div 
            className="absolute top-4 right-4 bg-white text-green-500 px-4 py-2 rounded-full shadow-md font-bold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            NEW ARRIVAL
          </motion.div>
        </div>
        
        <motion.h2 
          className="text-3xl font-extrabold text-center mt-6 mb-8 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Featured 🔥
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {featuredItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <FeatureCard 
                image={item.image} 
                title={item.title} 
                price={item.price} 
                isSoldOut={item.isSoldOut} 
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
