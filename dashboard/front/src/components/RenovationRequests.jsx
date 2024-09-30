import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from './nav';
import Modal from 'react-modal'; 

const RenovationRequests = () => {
  const [renovations, setRenovations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Renovation Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renovations.map((renovation) => (
            <motion.div
              key={renovation._id}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="text-lg font-semibold">Name: {renovation.name}</p>
              <p>Email: {renovation.email}</p>
              <p>Phone: {renovation.phone}</p>
              <p>Wall Height: {renovation.wallHeight} meters</p>
              <p>Wall Width: {renovation.wallWidth} meters</p>
              <img
                src={renovation.roomImage}
                alt="Room Image"
                className="w-full h-40 object-cover rounded-md mt-4"
              />
              <div className="mt-4 flex justify-between">
                <a
                  href={`mailto:${renovation.email}`}
                  className="py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
                >
                  Respond to Email
                </a>
                <button
                  onClick={() => openModal(renovation.roomImage)}
                  className="py-2 px-4 bg-gray-300 text-gray-800 text-center rounded-md hover:bg-gray-400"
                >
                  View Full Image
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Full Image */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '80%' } }}>
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl">✖</button>
        <img src={selectedImage} alt="Full Room" className="w-full h-auto" />
      </Modal>
    </>
  );
};

export default RenovationRequests;
