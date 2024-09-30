import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../nav';
import Room from '../room';
import Modal from '../modal';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Box } from 'lucide-react';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRoom, setShowRoom] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
        quantity: 1,
        price: product.price,
      });
      Swal.fire({
        title: 'Added to Cart!',
        text: 'This product has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue adding the product to your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
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
      <motion.div 
        className="container mx-auto px-4 py-8 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {product && product.imageUrl ? (
              <motion.img
                src={`http://localhost:4000/uploads/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <p className="text-center text-gray-600">Image not available</p>
            )}
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-black">{product?.name}</h1>
            <p className="text-2xl font-semibold text-black">${product?.price?.toFixed(2)}</p>
            <motion.div className="mb-4 bg-gray-100 p-4 rounded-lg">
              <p className="text-black">{product?.description}</p>
            </motion.div>
            <motion.button
              onClick={addToCart}
              className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </motion.button>
            <motion.button
              onClick={() => setShowRoom(true)}
              className="w-full mt-4 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box className="mr-2" size={20} />
              Show 3D Model
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showRoom && (
          <Modal isOpen={showRoom} onClose={() => setShowRoom(false)}>
            {product?.modelUrl && <Room modelUrl={`http://localhost:4000/uploads/${product.modelUrl}`} />}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;
