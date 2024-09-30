import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Gamepad, Monitor, Users, Rocket, Star, ShoppingCart } from 'lucide-react';
import Navbar from './nav';
import Footer from './footer';

const AnimatedIcon = ({ icon: Icon, delay }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: { duration: 2, delay, repeat: Infinity, repeatType: "reverse" }
    });
  }, [controls, delay]);

  return (
    <motion.div animate={controls}>
      <Icon size={48} className="text-black" /> {/* Changed icon color to black */}
    </motion.div>
  );
};

const HighEndAboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Navbar />
      <div className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8 mt-10"> {/* Changed bg to white and text to black */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-extrabold text-center mb-8"
            variants={itemVariants}
          >
            Welcome to HighEnd.com Where Gaming Dreams Come to Life
          </motion.h2>

          <motion.p 
            className="text-xl text-center mb-12"
            variants={itemVariants}
          >
            Immerse yourself in the ultimate gaming experience with cutting-edge gear and breathtaking 3D room designs.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div className="bg-gray-100 p-6 rounded-lg" variants={itemVariants}> {/* Changed background to light gray for cards */}
              <AnimatedIcon icon={Gamepad} delay={0} />
              <h3 className="text-2xl font-bold mt-4 mb-2">Premium Gaming Gear</h3>
              <p>Experience gaming like never before with our handpicked selection of top-tier peripherals and hardware.</p>
            </motion.div>

            <motion.div className="bg-gray-100 p-6 rounded-lg" variants={itemVariants}>
              <AnimatedIcon icon={Monitor} delay={0.5} />
              <h3 className="text-2xl font-bold mt-4 mb-2">3D Room Design</h3>
              <p>Transform your space into a gamer's paradise with our innovative 3D room design services.</p>
            </motion.div>

            <motion.div className="bg-gray-100 p-6 rounded-lg" variants={itemVariants}>
              <AnimatedIcon icon={Users} delay={1} />
              <h3 className="text-2xl font-bold mt-4 mb-2">Community-Driven</h3>
              <p>Join a passionate community of gamers and designers sharing ideas and inspiration.</p>
            </motion.div>
          </div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg mb-8">
              At HighEnd.com, we're on a relentless quest to elevate your gaming experience. We believe that every click, every frame, and every moment in your gaming space should be nothing short of extraordinary.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={itemVariants}
          >
            <div>
              <h4 className="text-2xl font-bold mb-4">Why Choose HighEnd.com?</h4>
              <ul className="space-y-2">
                <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <Star className="mr-2 text-yellow-400" /> Unparalleled Selection
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <Rocket className="mr-2 text-red-400" /> Cutting-Edge Technology
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <ShoppingCart className="mr-2 text-green-400" /> Seamless Shopping Experience
                </motion.li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Our Promise</h4>
              <p>
                We're not just selling products; we're crafting experiences. From the moment you land on our site to the second you sit down in your newly designed gaming haven, we're committed to exceeding your expectations at every turn.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Level Up?</h3>
            <p className="text-lg mb-8">
              Join us on this exciting journey and transform your gaming world today!
            </p>
            <motion.button
              className="bg-black text-white font-bold py-3 px-6 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Explore HighEnd.com
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default HighEndAboutUs;
