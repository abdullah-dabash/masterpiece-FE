import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useFloating, offset, shift, arrow } from '@floating-ui/react';
import Swal from 'sweetalert2';
import Footer from '../footer';
import Navbar from '../nav';

const AnimatedInput = ({ label, type, name, placeholder, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-10, 10], [2, -2]);
  const rotateY = useTransform(mouseX, [-10, 10], [-2, 2]);

  const { x, y, strategy, refs } = useFloating({
    placement: 'top-start',
    middleware: [offset(10), shift()],
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.input
          type={type}
          id={name}
          name={name}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light transition-all duration-300"
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ transform: "translateZ(20px)" }}
        />
      </motion.div>
      {(isFocused || isHovered) && (
        <motion.div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            pointerEvents: 'none',
            zIndex: 1000,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-800 text-white p-2 rounded-md text-sm">
            {placeholder}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ContactUs = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Thank you for reaching out to us. We will get back to you shortly!',
          confirmButtonText: 'OK'
        });
        event.target.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <>
      <Navbar />
      <motion.section 
        className="bg-gradient-to-b from-white to-gray-100 dark:bg-gray-900 pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <motion.h2 
            className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Contact Us
          </motion.h2>
          <motion.p 
            className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
          </motion.p>
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedInput
              label="Your email"
              type="email"
              name="email"
              placeholder="name@HighEnd.com"
              required={true}
            />
            <AnimatedInput
              label="Subject"
              type="text"
              name="subject"
              placeholder="Let us know how we can help you"
              required={true}
            />
            <motion.div 
              className="sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-all duration-300"
                placeholder="Leave a comment..."
                required
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send message
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
      <Footer />
    </>
  );
};

export default ContactUs;