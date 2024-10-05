import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Footer from '../footer';
import Navbar from '../nav';

const RoomRenovation = () => {
  const [image, setImage] = useState(null);
  const [wallHeight, setWallHeight] = useState('');
  const [wallWidth, setWallWidth] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (keep the existing submit logic)
  };

  return (
    <>
      <Navbar />
      <section className="bg-white text-white py-10 px-4 pt-32 relative overflow-hidden">
        {/* Animated neon lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            stroke="url(#neonGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
            stroke="url(#neonGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff">
                <animate attributeName="stop-color" values="#ff00ff; #00ffff; #ff00ff" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#00ffff">
                <animate attributeName="stop-color" values="#00ffff; #ff00ff; #00ffff" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Glowing cursor effect */}
        <motion.div
          className="glow"
          style={{
            position: 'absolute',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 10,
          }}
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
        />

        <div className="max-w-4xl mx-auto bg-black p-6 rounded-lg shadow-neon relative z-20">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-green-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Room Renovation
          </motion.h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <label htmlFor="roomImage" className="block text-lg font-medium text-white mb-2">Upload an Image of Your Room</label>
              <input
                type="file"
                id="roomImage"
                name="roomImage"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                required
              />
              {image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Room preview"
                    className="w-full h-auto object-cover rounded-md shadow-neon"
                  />
                </div>
              )}
            </motion.div>

            {/* Wall Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height Input */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <label htmlFor="wallHeight" className="block text-lg font-medium text-white mb-2">Wall Height (in feet)</label>
                <input
                  type="number"
                  id="wallHeight"
                  name="wallHeight"
                  placeholder="Enter wall height"
                  value={wallHeight}
                  onChange={(e) => setWallHeight(e.target.value)}
                  className="block w-full text-sm text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                  required
                />
              </motion.div>

              {/* Width Input */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <label htmlFor="wallWidth" className="block text-lg font-medium text-white mb-2">Wall Width (in feet)</label>
                <input
                  type="number"
                  id="wallWidth"
                  name="wallWidth"
                  placeholder="Enter wall width"
                  value={wallWidth}
                  onChange={(e) => setWallWidth(e.target.value)}
                  className="block w-full text-sm text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                  required
                />
              </motion.div>
            </div>

            {/* User Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full text-sm text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full text-sm text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full text-sm text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 text-white font-semibold rounded-md shadow-neon hover:shadow-neon-intense focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                Design My 3D Model
              </button>
            </motion.div>
          </form>

          {/* Renovated Rooms Gallery */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Renovated Rooms Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Gallery images */}
              {[
                "https://twinkly.com/cdn/shop/articles/blogpost-gamingroom.jpg?v=1680345581",
                "https://www.leetdesk.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fleetdesk%2F5faf0a70-6e31-4675-97a1-6aa8310b4309_led-gaming-zimmer-beleuchtung.jpg%3Fauto%3Dcompress%2Cformat&w=3840&q=75",
                "https://th.bing.com/th/id/OIP.DGQDyUX8vRMu5czW79zVJgHaE_?rs=1&pid=ImgDetMain",
                "https://th.bing.com/th/id/OIP.lqbLBkRxv91DozY7HINDrwHaJQ?w=736&h=920&rs=1&pid=ImgDetMain"
              ].map((src, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-md shadow-neon overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={src}
                    alt={`Renovated Room ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />

      <style jsx>{`
        .shadow-neon {
          box-shadow: 0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.5);
        }
        .shadow-neon-intense {
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.8);
        }
        .glow {
          width: 300px;
          height: 300px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

export default RoomRenovation;