import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

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
    const mailtoLink = `mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}&body=${encodeURIComponent(`Dear ${message.email},\n\n`)}${encodeURIComponent(`Thank you for reaching out. Here is my response:\n\n`)}`
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message._id} className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-2">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                  <p className="text-lg font-semibold text-gray-900">From: {message.email}</p>
                  <button
                    onClick={() => handleReplyClick(message)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Reply
                  </button>
                </div>
                <p className="text-gray-800">{message.message}</p>
                <p className="text-sm text-gray-500">Received on: {new Date(message.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactMessages;
