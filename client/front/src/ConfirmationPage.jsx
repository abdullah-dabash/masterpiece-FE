import React from 'react';
import Navbar from './nav';
import Footer from './footer';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto my-10 p-6 flex-grow flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
          <div className="bg-green-500 text-white py-6 px-6 flex items-center justify-center">
            <CheckCircle size={48} className="mr-4" />
            <h2 className="text-3xl font-bold">Thank You!</h2>
          </div>
          <div className="p-6">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-700 text-lg mb-4"
            >
              Your payment was successful. Your order has been placed.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center text-gray-600 mb-6"
            >
              <Mail className="mr-2" />
              <p>You will receive an email confirmation shortly.</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/')}
              className="w-full bg-black text-white px-4 py-2 rounded-full  transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="mr-2" />
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;