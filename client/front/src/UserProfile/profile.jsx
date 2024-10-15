import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../nav';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
      setIsChangingPassword(false);
    } catch (error) {
      console.error('Error changing password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to change password.',
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

  return (
    <>
      <Navbar />
      <div className='pt-32'></div>
      <motion.div 
        className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {profile ? (
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
              <p className="text-gray-700">Email: {profile.email}</p>
            </motion.div>
            <motion.button
              variants={itemVariants}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none transition duration-300"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </motion.button>
            {isChangingPassword && (
              <motion.form 
                onSubmit={handlePasswordChange} 
                className="space-y-4"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none transition duration-300"
                >
                  Change Password
                </button>
              </motion.form>
            )}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Favorite Products</h2>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((product) => (
                    <motion.div 
                      key={product._id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img 
                        src={`http://localhost:4000/uploads/${product.imageUrl}`} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => addToCart(product)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none transition duration-300 flex items-center"
                          >
                            <ShoppingCart size={18} className="mr-2" />
                            Add to Cart
                          </button>
                          <Heart size={24} fill="red" stroke="red" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You haven't added any favorites yet.</p>
              )}
            </motion.div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </motion.div>
    </>
  );
};

export default Profile;