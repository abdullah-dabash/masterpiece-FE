import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../nav';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Edit, Check, X, User, Mail, Lock } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');

  useEffect(() => {
    const fetchProfileAndFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User token is not available.');
        }

        const [profileResponse, favoritesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/profile/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/favorites', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setProfile(profileResponse.data);
        setEditedUsername(profileResponse.data.username);
        setFavorites(favoritesResponse.data);
      } catch (error) {
        console.error('Error fetching profile or favorites:', error);
        setError(error.message);
      }
    };

    fetchProfileAndFavorites();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User token is not available.');
      }

      await axios.post('http://localhost:5000/api/profile/change-password', 
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been changed successfully.',
      });

      setNewPassword('');
      setConfirmPassword('');
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error changing password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to change password.',
      });
    }
  };

  const handleProfileEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User token is not available.');
      }

      await axios.put('http://localhost:5000/api/profile/update', 
        { username: editedUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile({...profile, username: editedUsername});
      setIsEditingProfile(false);

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update profile.',
      });
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User token is not available.');
      }

      await axios.post('http://localhost:5000/api/cart/add', 
        {
          productId: product._id,
          quantity: 1,
          price: product.price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire({
        title: 'Added to Cart!',
        text: 'This product has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue adding the product to your cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='pt-32 bg-gray-100 min-h-screen'>
        <motion.div 
          className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {profile ? (
            <div className="space-y-12">
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex justify-between items-center">
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="text-4xl font-bold mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
                    />
                  ) : (
                    <h1 className="text-4xl font-bold mb-2">{profile.username}</h1>
                  )}
                  
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={18} />
                  <p>{profile.email}</p>
                </div>
              </motion.div>
              
              <AnimatePresence>
                <motion.form 
                  onSubmit={handlePasswordChange} 
                  className="space-y-4"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                  <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-full shadow hover:bg-gray-800 focus:outline-none transition duration-300">Change Password</button>
                </motion.form>
              </AnimatePresence>
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6">Favorite Products</h2>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((product) => (
                      <motion.div 
                        key={product._id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform perspective-1000"
                        variants={cardVariants}
                        whileHover="hover"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={`http://localhost:4000/uploads/${product.imageUrl}`} 
                            alt={product.name} 
                            className="w-full h-full object-cover transform transition duration-300 hover:scale-110"
                          />
                          <div className="absolute top-0 right-0 m-4">
                            <Heart size={24} fill="white" stroke="white" />
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full px-4 py-2 bg-black text-white rounded-full shadow hover:bg-gray-800 focus:outline-none transition duration-300 flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart size={18} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center text-lg">You haven't added any favorites yet.</p>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Profile;