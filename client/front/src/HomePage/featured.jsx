import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const featuredItems = [
  { id: 1, title: "RGB Gaming Keyboard", price: 89.99, image: "https://assets2.razerzone.com/images/pnx.assets/ca2d35feecdc03c3d7b44d38374bd5f4/deathstalker-family-cat-mobile.webp" },
  { id: 2, title: "4K Gaming Monitor", price: 399.99, image: "https://dlcdnwebimgs.asus.com/gain/C650BB77-5D96-4CED-86C2-68B700AF88C9/w750/h470" },
  { id: 3, title: "Wireless Gaming Mouse", price: 59.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgn5ubQ6ljjRznc92U9orN0cSdZPvAdimug&s" },
  { id: 4, title: "Gaming Headset", price: 79.99, image: "https://images.tokopedia.net/img/cache/700/product-1/2018/11/20/9575003/9575003_fffa421b-0c0c-401d-a4e0-1926513cd938_500_500.png" },
];

const FeatureCard = ({ image, title, price, onHover }) => (
  <motion.div 
    className="relative group cursor-pointer"
    whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0], transition: { duration: 0.3 } }}
    whileTap={{ scale: 0.95 }}
    onHoverStart={() => onHover(title)}
    onHoverEnd={() => onHover(null)}
  >
    <motion.img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-lg shadow-lg"
      whileHover={{ filter: "brightness(1.2)" }}
    />
    <motion.div 
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-white text-lg font-bold truncate">{title}</h3>
      <span className="text-yellow-400 font-bold">${price}</span>
    </motion.div>
  </motion.div>
);

const FeaturedShowcase = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-white">
    <h2 className="bg-white text-3xl font-extrabold text-center mt-6 mb-8 pt-10 "> Featured 🔥
      </h2>
      
    <div className="bg-white min-h-screen pt-20 ">
      <motion.div 
        className="container mx-auto p-6 bg-black rounded-lg shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg overflow-hidden mb-8"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="https://wallpaperaccess.com/full/5872521.jpg"
            alt="Featured Gaming Setup"
            className="w-full object-cover h-64 opacity-50"
          />
          <motion.div 
            className="absolute inset-0 flex flex-col justify-center items-center text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold mb-2">Level Up Your Game</h1>
            <p className="text-xl">Discover Our Epic Gaming Gear</p>
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-extrabold text-center mt-6 mb-8 text-white pb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Featured Products 🎮🔥
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-20"
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
          {featuredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <FeatureCard 
                image={item.image} 
                title={item.title} 
                price={item.price}
                onHover={setHoveredItem}
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              className="fixed bottom-4 left-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <p className="font-bold">🚀 {hoveredItem} selected! Ready to upgrade your setup?</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </div>
    
  );
};

export default FeaturedShowcase;