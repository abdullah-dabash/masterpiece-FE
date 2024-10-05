import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/dashboard" className="block py-2 px-4 text-white hover:bg-gray-700">
            Dashboard
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard/products"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                <span>Products</span>
                <ChevronRight className="ml-auto h-5 w-5" />
              </Link>
              <Link
                to="/dashboard/OrderDashboard"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                <span>Orders</span>
                <ChevronRight className="ml-auto h-5 w-5" />
              </Link>
              <Link
                to="/dashboard/messages"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                <span>Messages</span>
                <ChevronRight className="ml-auto h-5 w-5" />
              </Link>
              <Link
                to="/dashboard/renovations"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                <span>Renovations</span>
                <ChevronRight className="ml-auto h-5 w-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700"
              >
                <span>Logout</span>
                <ChevronRight className="ml-auto h-5 w-5" />
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b lg:hidden">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-2xl font-semibold">Dashboard</div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {/* Your main content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
