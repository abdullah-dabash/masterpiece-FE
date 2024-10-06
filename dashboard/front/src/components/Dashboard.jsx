import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, ShoppingCart, MessageCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import Sidebar from './nav';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" />;
  }

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalMessages: 0,
    revenue: 0,
    customers: 0
  });

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setStats({
      totalProducts: 150,
      totalOrders: 75,
      totalMessages: 30,
      revenue: 15000,
      customers: 500
    });

    setSalesData([
      { name: 'Jan', sales: 4000 },
      { name: 'Feb', sales: 3000 },
      { name: 'Mar', sales: 5000 },
      { name: 'Apr', sales: 4500 },
      { name: 'May', sales: 6000 },
      { name: 'Jun', sales: 5500 },
    ]);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
      variants={cardVariants}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <Icon size={32} className="text-blue-500" />
    </motion.div>
  );

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <StatCard title="Total Products" value={stats.totalProducts} icon={Package} />
          <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingCart} />
          <StatCard title="Messages" value={stats.totalMessages} icon={MessageCircle} />
          <StatCard title="Revenue" value={`$${stats.revenue}`} icon={DollarSign} />
          <StatCard title="Customers" value={stats.customers} icon={Users} />
          <StatCard title="Growth" value="15%" icon={TrendingUp} />
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {[
            { to: "/dashboard/products", title: "Manage Products", description: "Add, view, and manage your products.", icon: Package },
            { to: "/dashboard/OrderDashboard", title: "View Orders", description: "See and manage customer orders.", icon: ShoppingCart },
            { to: "/dashboard/messages", title: "Contact Messages", description: "View messages from the contact form.", icon: MessageCircle }
          ].map((item, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link 
                to={item.to} 
                className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 transition flex items-start"
              >
                <item.icon size={24} className="text-blue-500 mr-4 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;