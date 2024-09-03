import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';
const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders/all');
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">View Orders</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border-b last:border-b-0 py-4">
              <p className="text-lg font-semibold">Order ID: {order._id}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ViewOrders;
