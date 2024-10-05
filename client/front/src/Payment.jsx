import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './nav';
import Footer from './footer';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  const [orderID, setOrderID] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderID = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire('Not Logged In', 'You need to be logged in to proceed with payment.', 'warning');
          navigate('/Login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const cartItems = response.data;
        if (cartItems.length === 0) {
          Swal.fire('Empty Cart', 'Your cart is empty. Add items to proceed.', 'info');
          navigate('/Cart');
          return;
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

        const orderResponse = await axios.post('http://localhost:5000/api/orders', {
          total: totalAmount
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setOrderID(orderResponse.data.orderID);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error creating order:', error);
        Swal.fire('Error', 'Failed to create order', 'error');
        setError('Failed to create order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderID();
  }, [navigate]);

  const handleApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        Swal.fire('Success', 'Payment successful!', 'success');

        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/cart/clear', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        navigate('/ConfirmationPage');
      } catch (error) {
        console.error('Error handling payment approval:', error);
        Swal.fire('Error', 'Failed to complete payment', 'error');
      }
    });
  };

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center h-screen"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </motion.div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto my-10 p-6 text-center"
    >
      <p className="text-red-600 text-xl">{error}</p>
      <button
        onClick={() => navigate('/Cart')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Return to Cart
      </button>
    </motion.div>
  );

  return (
    <div className="flex flex-col min-h-screen pt-5">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto my-10 p-6 flex-grow"
      >
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-black text-white py-4 px-6">
            <h2 className="text-2xl font-bold">Payment Details</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Order ID:</p>
              <p className="text-xl font-semibold">{orderID}</p>
            </div>
            <div className="mb-8">
              <p className="text-gray-600 mb-2">Total Amount:</p>
              <p className="text-3xl font-bold text-black">{total.toFixed(2)} JD</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: total.toFixed(2)
                      }
                    }]
                  });
                }}
                onApprove={handleApprove}
                style={{ layout: "vertical" }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default PaymentPage;