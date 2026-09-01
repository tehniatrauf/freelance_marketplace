// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { 
  FaBars, 
  FaTimes, 
  FaUserCircle, 
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaHome,
  FaBell
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Jobs', path: '/browse-jobs' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'client') return '/client/dashboard';
    if (user.role === 'freelancer') return '/freelancer/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/login';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
            >
              W
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              WorkConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 relative ${
                  location.pathname === link.path
                    ? 'text-blue-600'
                    : 'text-dark-600'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FaBell className="text-dark-600 text-xl" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-dark-700 hidden lg:block">
                      {user.name}
                    </span>
                    <FaChevronDown
                      className={`text-dark-400 text-xs transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="font-semibold text-dark-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-dark-500">
                            {user.email}
                          </div>
                          <div className="mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-700">
                            {user.role}
                          </div>
                        </div>

                        <div className="py-2">
                          <Link
                            to={getDashboardLink()}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FaHome className="text-dark-400" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FaUser className="text-dark-400" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FaCog className="text-dark-400" />
                            <span>Settings</span>
                          </Link>
                          <hr className="my-1 border-gray-100" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors w-full"
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-dark-700 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm py-2 px-6"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <FaTimes className="text-2xl text-dark-600" />
              ) : (
                <FaBars className="text-2xl text-dark-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-xl transition-colors ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'hover:bg-gray-50 text-dark-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 rounded-xl hover:bg-gray-50 text-dark-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 rounded-xl bg-red-50 text-red-600 text-center font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;