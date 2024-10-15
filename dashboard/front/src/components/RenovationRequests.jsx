import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './nav';
import { Table } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-gray-800 p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-4 bg-black text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const RenovationRequests = () => {
  const [renovations, setRenovations] = useState([]);
  const [selectedRenovation, setSelectedRenovation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableView, setIsTableView] = useState(true);

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

  const openModal = (renovation) => {
    setSelectedRenovation(renovation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const tableHeaders = ['Name', 'Email', 'Phone', 'Wall Dimensions', 'Actions'];

  return (
    <div className="flex bg-gradient-to-br from-black to-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-grow p-6 overflow-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="text-4xl font-bold mb-6 text-center text-white"
        >
          Renovation Requests
        </motion.h1>
        <div className="mb-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTableView(!isTableView)}
            className="bg-white text-black py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
          >
            {isTableView ? <Table className="mr-2" /> : <Table className="mr-2" />}
            {isTableView ? 'Grid View' : 'Table View'}
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {isTableView ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-black">
                    {tableHeaders.map((header, index) => (
                      <th key={index} className="px-4 py-2 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renovations.map((renovation, index) => (
                    <motion.tr
                      key={renovation._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{renovation.name}</td>
                      <td className="px-4 py-2">{renovation.email}</td>
                      <td className="px-4 py-2">{renovation.phone}</td>
                      <td className="px-4 py-2">{renovation.wallWidth}m x {renovation.wallHeight}m</td>
                      <td className="px-4 py-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openModal(renovation)}
                          className="bg-black text-white py-1 px-3 rounded-full transition duration-300 ease-in-out"
                        >
                          View Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {renovations.map((renovation) => (
                <motion.div
                  key={renovation._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg border border-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(99,102,241,0.4)" }}
                >
                  <p className="text-xl font-semibold mb-2 text-white">{renovation.name}</p>
                  <p className="text-gray-400 mb-1">{renovation.email}</p>
                  <p className="text-gray-400 mb-1">{renovation.phone}</p>
                  <motion.img
                    src={renovation.roomImage}
                    alt="Room"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <motion.button
                    className="mt-4 w-full py-2 px-4 bg-black text-white text-center rounded-full"
                    whileHover={{ scale: 1.05, backgroundColor: "" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(renovation)}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-2xl font-bold mb-4 text-white">{selectedRenovation.name}'s Request</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-gray-300 mb-2">Email: {selectedRenovation.email}</p>
                <p className="text-gray-300 mb-2">Phone: {selectedRenovation.phone}</p>
                <p className="text-gray-300 mb-2">Wall Dimensions: {selectedRenovation.wallWidth}m x {selectedRenovation.wallHeight}m</p>
              </div>
              <motion.img
                src={selectedRenovation.roomImage}
                alt="Room"
                className="w-full h-auto object-cover rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RenovationRequests;