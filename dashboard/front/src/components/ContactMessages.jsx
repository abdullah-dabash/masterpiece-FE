import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './nav';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [expandedMessage, setExpandedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/messages/all');
        setMessages(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, []);

  const handleReplyClick = (message) => {
    const mailtoLink = `mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}&body=${encodeURIComponent(`Dear ${message.email},\n\n`)}${encodeURIComponent(`Thank you for reaching out. Here is my response:\n\n`)}`;
    window.location.href = mailtoLink;
  };

  const toggleMessageExpansion = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <motion.h1 
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Contact Messages
        </motion.h1>
        <motion.div 
          className="bg-gray-900 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div 
                key={message._id} 
                className="border-b border-gray-700 py-4 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <motion.div 
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => toggleMessageExpansion(message._id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Mail size={20} />
                    <p className="text-lg font-semibold">{message.email}</p>
                  </motion.div>
                  <motion.button
                    onClick={() => handleReplyClick(message)}
                    className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reply
                  </motion.button>
                </div>
                <AnimatePresence>
                  {expandedMessage === message._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-300 mb-2">{message.message}</p>
                      <p className="text-sm text-gray-500">Received on: {new Date(message.createdAt).toLocaleDateString()}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactMessages;