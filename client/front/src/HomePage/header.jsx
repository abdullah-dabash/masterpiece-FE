import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad, MonitorPlay, Sofa } from 'lucide-react';

const HeroSection = () => {
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

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
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

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-green-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to HighEnd
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Elevate your gaming experience with our premium accessories, furniture, and custom 3D room designs.
        </motion.p>
        
        {/* Animated icons */}
        <div className="flex justify-center space-x-12 mb-12">
          {[Gamepad, MonitorPlay, Sofa].map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            >
              <Icon size={48} className="text-white" style={{ filter: 'drop-shadow(0 0 10px #00ffff)' }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            to="/products" 
            className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:bg-gray-200 hover:shadow-neon"
          >
            Explore Our Collection
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .hover\:shadow-neon:hover {
          box-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff, 0 0 30px #ff00ff;
        }
        .glow {
          width: 300px;
          height: 300px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;