import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoomRenovation from './room/renovation'; // Import the RoomRenovation component
import './index.css'; // Import your CSS file

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo with Link to Home */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-white moving-color">
            HighEnd
          </Link>
        </div>

        {/* Links (Home, Favorites, Contact, Register) - Centered */}
        <div className="hidden md:flex flex-1 pl-48 justify-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Home</Link>
          <Link to="/contact/ContactUs" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Contact</Link>
          <Link to="/SignUp" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Register</Link>
          <Link to="/room/renovation" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 moving-color">Room Renovation</Link>
        </div>

        {/* Search bar - Desktop */}
        <div className="hidden md:flex items-center ml-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19l-6-6m6 0l-6 6m6-6H5M3 5h4.586a2 2 0 0 1 1.414.586L13 10.172a2 2 0 0 0 1.414.586L19 8.172V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.828a2 2 0 0 0-.586-1.414L17.414 7H12"></path>
              </svg>
            </span>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Cart, Favorite, and Profile Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          <Link to="/cart">
            <button className="btn btn-cart text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none">
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/swing/shopping-cart-228.png"
                alt="Cart"
                className="w-6 h-6"
              />
            </button>
          </Link>
          <Link to="/favorite">
            <button className="btn btn-favorite text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </button>
          </Link>
          <Link to="/profile">
            <button className="btn btn-profile text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8847/8847198.png"
                alt="Profile"
                className="w-6 h-6"
              />
            </button>
          </Link>
        </div>

        {/* Hamburger menu (mobile) */}
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

      {/* Search bar and Icons (Mobile) */}
      <div className="md:hidden flex items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <div className="relative flex-1 mr-4">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19l-6-6m6 0l-6 6m6-6H5M3 5h4.586a2 2 0 0 1 1.414.586L13 10.172a2 2 0 0 0 1.414.586L19 8.172V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.828a2 2 0 0 0-.586-1.414L17.414 7H12"></path>
            </svg>
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>
        <Link to="/cart">
          <button className="btn btn-cart text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none ml-2">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/swing/shopping-cart-228.png"
              alt="Cart"
              className="w-6 h-6"
            />
          </button>
        </Link>
        <Link to="/favorite">
          <button className="btn btn-favorite text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none ml-2">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </button>
        </Link>
        <Link to="/profile">
          <button className="btn btn-profile text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none ml-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8847/8847198.png"
              alt="Profile"
              className="w-6 h-6"
            />
          </button>
        </Link>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="flex flex-col mt-3 px-4 py-2">
          <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300">Home</Link>
          <Link to="/contact/contactUs" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300">Contact</Link>
          <Link to="/SignUp" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300">Register</Link>
          <Link to="/room/renovation" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300">Room Renovation</Link>
          <Link to="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
