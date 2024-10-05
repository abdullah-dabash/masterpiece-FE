import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Add state for cart count
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/profile/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Ensure this line is correct
              'Content-Type': 'application/json'
            }
          });
    
          if (response.ok) {
            const data = await response.json();
            setUser({ ...data, token });
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/cart', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setCartCount(data.length); // Assume the response is an array of cart items
          }
        }
      } catch (error) {
        console.error('Failed to fetch cart count:', error);
        setCartCount(0);
      }
    };

    fetchUser();
    fetchCartCount();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-white moving-color">
            HighEnd
          </Link>
        </div>

        <div className="hidden md:flex flex-1 pl-48 justify-center items-center space-x-8">
          <Link to="/contact/ContactUs" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Contact</Link>
          <Link to="/room/renovation" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Room Renovation</Link>
          <Link to="/aboutUs" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">About Us</Link>
          
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <Link to="/cart" className="relative">
            <button className="btn btn-cart text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none">
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/swing/shopping-cart-228.png"
                alt="Cart"
                className="w-6 h-6"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
          

          {user ? (
            <>
              <Link to="/profile">
                <button className="btn btn-profile text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8847/8847198.png" // Replace with your profile icon URL
                    alt="Profile"
                    className="w-6 h-6"
                  />
                </button>
              </Link>
              <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6-8v16" />
                </svg>
              </button>
            </>
          ) : (
            <Link to="/SignUp" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Register</Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40">
          <button
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center py-4 space-y-2">
            <Link to="/contact/ContactUs" className="text-gray-700 dark:text-white text-lg moving-color">Contact</Link>
            {!user ? (
              <Link to="/SignUp" className="text-gray-700 dark:text-white text-lg moving-color">Register</Link>
            ) : (
              <>
                <Link to="/profile" className="text-gray-700 dark:text-white text-lg moving-color">Profile</Link>
                <button onClick={handleLogout} className="text-gray-700 dark:text-white text-lg moving-color">Logout</button>
              </>
            )}
            <Link to="/room/renovation" className="text-gray-700 dark:text-white text-lg moving-color">Room Renovation</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
