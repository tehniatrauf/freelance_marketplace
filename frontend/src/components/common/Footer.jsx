// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                W
              </div>
              <span className="text-xl font-bold">WorkConnect</span>
            </div>
            <p className="text-gray-400 text-sm">
              A two-sided marketplace connecting clients with skilled freelancers.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/client/post-job" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/browse-freelancers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Find Freelancers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/freelancer/find-jobs" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/freelancer/profile" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} WorkConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;