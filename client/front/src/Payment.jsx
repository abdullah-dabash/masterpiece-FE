import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './nav';
import Footer from './footer';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
          navigate('/Login'); // Redirect to login if not logged in
          return;
        }

        // Fetch cart items
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const cartItems = response.data;
        if (cartItems.length === 0) {
          Swal.fire('Empty Cart', 'Your cart is empty. Add items to proceed.', 'info');
          navigate('/Cart'); // Redirect to cart if empty
          return;
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

        // Create order
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-6 sm:p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <p className="mb-4">Order ID: {orderID}</p>
        <p className="mb-4">Total Amount: ${total.toFixed(2)}</p>

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
        />
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
