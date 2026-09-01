// src/components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaUsers, 
  FaStar, 
  FaCog, 
  FaSignOutAlt,
  FaUser,
  FaComments,
  FaSearch,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaChartBar  // ← Use FaChartBar or FaTachometerAlt instead
} from 'react-icons/fa';

const Sidebar = ({ user, role, onLogout }) => {
  const location = useLocation();

  const clientLinks = [
    { path: '/client/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/client/post-job', icon: FaFileAlt, label: 'Post Job' },
    { path: '/client/my-jobs', icon: FaBriefcase, label: 'My Jobs' },
    { path: '/client/applications', icon: FaUsers, label: 'Applications' },
    { path: '/client/shortlisted', icon: FaStar, label: 'Shortlisted' },
    { path: '/client/projects', icon: FaClock, label: 'Projects' },
    { path: '/client/messages', icon: FaComments, label: 'Messages' },
    { path: '/client/profile', icon: FaUser, label: 'Profile' },
    { path: '/client/settings', icon: FaCog, label: 'Settings' },
  ];

  const freelancerLinks = [
    { path: '/freelancer/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/freelancer/find-jobs', icon: FaSearch, label: 'Find Jobs' },
    { path: '/freelancer/my-applications', icon: FaFileAlt, label: 'Applications' },
    { path: '/freelancer/projects', icon: FaBriefcase, label: 'Projects' },
    { path: '/freelancer/messages', icon: FaComments, label: 'Messages' },
    { path: '/freelancer/profile', icon: FaUser, label: 'Profile' },
    { path: '/freelancer/portfolio', icon: FaStar, label: 'Portfolio' },
    { path: '/freelancer/settings', icon: FaCog, label: 'Settings' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/users', icon: FaUsers, label: 'Users' },
    { path: '/admin/jobs', icon: FaBriefcase, label: 'Jobs' },
    { path: '/admin/reports', icon: FaFileAlt, label: 'Reports' },
    { path: '/admin/categories', icon: FaStar, label: 'Categories' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  const getLinks = () => {
    if (role === 'client') return clientLinks;
    if (role === 'freelancer') return freelancerLinks;
    if (role === 'admin') return adminLinks;
    return [];
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-semibold text-dark-900">{user?.name || 'User'}</div>
            <div className="text-xs text-dark-500 capitalize">{role}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
            
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-dark-600 hover:bg-gray-50 hover:text-dark-900'
                  }`}
                >
                  <Icon className={`text-lg ${isActive ? 'text-blue-600' : 'text-dark-400'}`} />
                  <span className="text-sm">{link.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;