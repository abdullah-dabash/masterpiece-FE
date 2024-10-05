import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './nav';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

const RenovationRequests = () => {
  const [renovations, setRenovations] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRenovations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/renovation/all');
        setRenovations(response.data);
      } catch (err) {
        console.error('Error fetching renovations:', err);
      }
    };

    fetchRenovations();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Renovation Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renovations.map((renovation) => (
            <motion.div
              key={renovation._id}
              className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(255,255,255,0.2)" }}
            >
              <p className="text-xl font-semibold mb-2">{renovation.name}</p>
              <p className="text-gray-400 mb-1">{renovation.email}</p>
              <p className="text-gray-400 mb-1">{renovation.phone}</p>
              <p className="text-gray-400 mb-1">Wall: {renovation.wallHeight}m x {renovation.wallWidth}m</p>
              <motion.img
                src={renovation.roomImage}
                alt="Room"
                className="w-full h-48 object-cover rounded-md mt-4 mb-4"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex justify-between items-center mt-4">
                <motion.a
                  href={`mailto:${renovation.email}`}
                  className="py-2 px-4 bg-white text-black text-center rounded-md"
                  whileHover={{ scale: 1.05, backgroundColor: "#cccccc" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Respond
                </motion.a>
                <motion.button
                  className="py-2 px-4 bg-gray-700 text-white text-center rounded-md"
                  whileHover={{ scale: 1.05, backgroundColor: "#4a4a4a" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(renovation.roomImage)}
                >
                  View Image
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <img src={selectedImage} alt="Full Room" className="max-w-full max-h-[70vh]" />
        </Modal>
      </AnimatePresence>
    </div>
  );
};

export default RenovationRequests;