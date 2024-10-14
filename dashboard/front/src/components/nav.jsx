import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Sidebar = ({ children }) => {
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

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    return () => {
      document.body.style.margin = null;
      document.body.style.padding = null;
      document.documentElement.style.margin = null;
      document.documentElement.style.padding = null;
    };
  }, []);

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
    <div className="flex h-screen overflow-hidden">
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black text-white transform transition-all duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/dashboard" className="text-xl font-bold text-white hover:text-gray-300">
            Dashboard
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 h-full overflow-y-auto">
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
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b lg:hidden">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-2xl font-semibold">Dashboard</div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
