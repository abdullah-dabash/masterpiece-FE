import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';
import Footer from './footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CartComponent = () => {
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCartItems(response.data);
      } catch (error) {
        setError('Error fetching cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find(item => item._id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/cart/update/${id}`, {
        quantity: newQuantity
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cart);
      Swal.fire('Removed!', 'Item has been removed from your cart.', 'success');
    } catch (error) {
      console.error('Error removing item:', error);
      Swal.fire('Error!', 'Failed to remove item from cart.', 'error');
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(response.data.cart);
      Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
    } catch (error) {
      console.error('Error clearing cart:', error);
      Swal.fire('Error!', 'Failed to clear cart.', 'error');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.productId.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      Swal.fire('Not logged in', 'Please log in to proceed to checkout.', 'warning');
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire('Cart is empty', 'Please add items to your cart before proceeding to checkout.', 'info');
      return;
    }

    navigate('/Payment');
  };

  const subtotal = calculateTotal();
  const discount = couponCode === 'SAVE10' ? 0.10 * subtotal : 0;
  const total = subtotal - discount;

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center h-screen"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </motion.div>
  );
  
  if (error) return (
    <motion.p
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center text-red-600 text-xl mt-10"
    >
      {error}
    </motion.p>
  );

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto my-10 p-4 flex-grow"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                    <img 
                      src={`http://localhost:4000/uploads/${item.productId.imageUrl}`} 
                      alt={item.productId.name} 
                      className="w-24 h-24 object-cover rounded-md mr-4" 
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{item.productId.name}</h3>
                      <p className="text-sm text-gray-600">{item.productId.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="bg-gray-200 text-gray-800 rounded-l-md px-3 py-1 hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="bg-gray-200 text-gray-800 rounded-r-md px-3 py-1 hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                    >
                      Remove
                    </button>
                    <p className="text-lg font-medium text-gray-800 ml-4">
                      {(item.productId.price * item.quantity).toFixed(2)} JD
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">Your cart is empty</p>
            )}
            {cartItems.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Clear Cart
              </motion.button>
            )}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg h-min sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} JD</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span>{total.toFixed(2)} JD</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                className="w-full bg-black text-white px-4 py-3 rounded-md  transition-colors"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CartComponent;