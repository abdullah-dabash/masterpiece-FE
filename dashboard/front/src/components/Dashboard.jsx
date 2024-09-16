import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from './nav';

const Dashboard = () => {
  // Check for token in localStorage
  const token = localStorage.getItem('token'); 

  // Redirect to login page if not authenticated
  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/dashboard/products" 
            className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
            <p className="text-gray-600">Add, view, and manage your products.</p>
          </Link>
          <Link 
            to="/dashboard/OrderDashboard" 
            className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">View Orders</h2>
            <p className="text-gray-600">See and manage customer orders.</p>
          </Link>
          <Link 
            to="/dashboard/messages" 
            className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Contact Messages</h2>
            <p className="text-gray-600">View messages from the contact form.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
