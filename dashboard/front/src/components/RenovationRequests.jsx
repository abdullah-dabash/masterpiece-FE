// src/components/RenovationRequests.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';

const RenovationRequests = () => {
  const [renovations, setRenovations] = useState([]);

  useEffect(() => {
    const fetchRenovations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/renovations/all');
        setRenovations(response.data);
      } catch (err) {
        console.error('Error fetching renovations:', err);
      }
    };

    fetchRenovations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Renovation Requests</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul>
            {renovations.map((renovation) => (
              <li key={renovation._id} className="border-b last:border-b-0 py-4">
                <p className="text-lg font-semibold">Name: {renovation.name}</p>
                <p>Email: {renovation.email}</p>
                <p>Phone: {renovation.phone}</p>
                <p>Wall Height: {renovation.wallHeight} meters</p>
                <p>Wall Width: {renovation.wallWidth} meters</p>
                <img
                  src={`http://localhost:4000/${renovation.roomImage}`}
                  alt="Room Image"
                  className="w-full mt-4"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RenovationRequests;
