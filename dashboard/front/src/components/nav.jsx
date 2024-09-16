import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State to check authentication
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      navigate('/'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Remove token from local storage
      localStorage.removeItem('token');

      // Redirect to login page
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu visibility
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo or Brand Name */}
            <div className="text-2xl font-semibold">
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
            </div>
          </div>
          {isAuthenticated && (
            <div className="hidden md:flex md:space-x-4">
              {/* Navigation Links */}
              <Link
                to="/dashboard/products"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/dashboard/OrderDashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu} // Close menu on link click
              >
                orders
              </Link>
              <Link
                to="/dashboard/messages"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Messages
              </Link>
              <Link
                to="/dashboard/renovations"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Renovations
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center p-2 text-gray-400 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
              onClick={toggleMenu} // Toggle menu on click
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard/products"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu} // Close menu on link click
              >
                Products
              </Link>
              
              <Link
                to="/dashboard/messages"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu} // Close menu on link click
              >
                Messages
              </Link>
              <Link
                to="/dashboard/renovations"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu} // Close menu on link click
              >
                Renovations
              </Link>
              <Link
                to="/dashboard/OrderDashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu} // Close menu on link click
              >
                orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu(); // Close menu on logout
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
