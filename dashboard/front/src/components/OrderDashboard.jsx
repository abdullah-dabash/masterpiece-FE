import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './nav'; // Assuming Sidebar is already implemented
import { motion, AnimatePresence } from 'framer-motion';
import { Truck } from 'lucide-react';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:4000/api/orders/${orderId}`, { status: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
    }
  };

  if (loading) return (
    <motion.div 
      className="flex items-center justify-center h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  if (error) return (
    <motion.p 
      className="text-center text-red-500 bg-gray-900 p-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {error}
    </motion.p>
  );

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar /> {/* Existing sidebar component */}
      <div className="flex-grow p-6 overflow-auto">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Order Dashboard
        </motion.h2>
        <div className="overflow-x-auto">
          <motion.table 
            className="min-w-full bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <motion.tr 
                      key={order._id} 
                      className="border-b-2 border-gray-700 text-white hover:bg-gray-700 transition-colors duration-200"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="py-3 px-4">{order._id}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded bg-green-500 text-black">Paid</span>
                      </td>
                      <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        {order.items.map(item => (
                          <div key={item.product._id} className="text-sm">
                            {item.product.name} (x{item.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4">
                        {order.status !== 'delivered' ? (
                          <motion.button
                            onClick={() => updateStatus(order._id, 'delivered')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Truck className="mr-2" size={18} />
                            Mark as Delivered
                          </motion.button>
                        ) : (
                          <span className="text-green-400 flex items-center">
                            <Truck className="mr-2" size={18} />
                            Delivered
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="5" className="py-4 text-center text-white">No orders found</td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
