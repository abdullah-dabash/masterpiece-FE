import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ManageProducts from './components/ManageProducts';
import ContactMessages from './components/ContactMessages';
import RenovationRequests from './components/RenovationRequests'; // Import the new component
import Login from './components/Login';
import Sidebar from './components/nav';
import OrderDashboard from './components/OrderDashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nav" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<ManageProducts />} />
        <Route path="/dashboard/messages" element={<ContactMessages />} />
        <Route path="/dashboard/OrderDashboard" element={<OrderDashboard/>} />
        <Route path="/dashboard/renovations" element={<RenovationRequests />} /> {/* Add route for RenovationRequests */}
      </Routes>
    </Router>
  );
};

export default App;
