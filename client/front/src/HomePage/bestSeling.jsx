import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFloating, offset, shift, autoUpdate, arrow } from '@floating-ui/react';
import { motion, useMotionValue, useTransform, useInView, useAnimation } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const arrowRef = useRef(null);
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [30, -30]);
  const rotateY = useTransform(mouseX, [-300, 300], [-30, 30]);

  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    >
      <motion.div
        className="bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 p-1 rounded-xl shadow-lg overflow-hidden"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bg-black rounded-lg overflow-hidden">
          <motion.img
            src={`http://localhost:4000/uploads/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-48 object-cover"
            style={{ transform: "translateZ(40px)" }}
            whileHover={{ scale: 1.1 }}
          />
          <div className="p-4 text-center" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <p className="text-lg text-gray-300">{product.price}</p>
            <Link
              to={`/product/${product._id}`}
              className="mt-4 inline-block bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-black font-bold py-2 px-4 rounded-md hover:from-pink-600 hover:via-blue-600 hover:to-green-600 transition-all duration-300"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </motion.div>

      {isHovered && (
        <motion.div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
            transformStyle: "preserve-3d",
            transform: "translateZ(50px)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 p-1 rounded-lg shadow-lg"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)",
            }}
          >
            <div className="bg-black text-white p-4 rounded-lg">
              <p className="font-bold">{product.name}</p>
              <p>{product.description}</p>
              <p className="mt-2 font-semibold">{product.price}</p>
            </div>
          </div>
          <div
            ref={arrowRef}
            className="absolute bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 w-4 h-4 transform rotate-45"
            style={{
              top: arrowY != null ? `${arrowY}px` : '',
              left: arrowX != null ? `${arrowX}px` : '',
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/all');
        setProducts(response.data);
      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section ref={containerRef} className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-black ">
            Best Selling Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>

        {error && (
          <motion.p
            className="text-red-600 text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default BestSellingProducts;