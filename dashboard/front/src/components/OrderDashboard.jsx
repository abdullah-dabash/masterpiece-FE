import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './nav';

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
      // Update state locally to reflect the status change
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-6 sm:p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Dashboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Items</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2 px-4 text-sm">{order._id}</td>
                    <td className="py-2 px-4 text-sm">{order.status}</td>
                    <td className="py-2 px-4 text-sm">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-4 text-sm">
                      {order.items.map(item => (
                        <div key={item.product._id}>
                          {item.product.name} ({item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(order._id, 'delivered')}
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <span className="text-gray-500">Already Delivered</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderDashboard;
