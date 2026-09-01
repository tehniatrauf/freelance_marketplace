// src/components/auth/RoleSelection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { user, updateUserRole } = useAuth();

  const handleRoleSelect = async (role) => {
    try {
      // Update user role in database
      // await api.put('/users/role', { role });
      
      toast.success(`Welcome to WorkConnect! 🎉`);
      
      // Redirect to appropriate dashboard
      if (role === 'client') {
        navigate('/client/dashboard');
      } else if (role === 'freelancer') {
        navigate('/freelancer/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to set role. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              W
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold text-dark-900">Choose Your Role</h2>
          <p className="mt-4 text-xl text-dark-500 max-w-2xl mx-auto">
            Select how you want to use WorkConnect. You can always switch later.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect('client')}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 mb-6">
              <FaUserTie className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900 mb-3">Client</h3>
            <p className="text-dark-500 leading-relaxed">
              Post jobs, find talented freelancers, and manage your projects efficiently.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-dark-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Post job opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Review applications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Hire and manage freelancers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Track project progress
              </li>
            </ul>
            <div className="mt-6 flex items-center text-blue-600 font-medium">
              Continue as Client
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Freelancer Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect('freelancer')}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-500 mb-6">
              <FaLaptopCode className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900 mb-3">Freelancer</h3>
            <p className="text-dark-500 leading-relaxed">
              Find meaningful work, showcase your skills, and grow your career.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-dark-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Browse job opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Apply to projects
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Build your portfolio
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Get paid for your work
              </li>
            </ul>
            <div className="mt-6 flex items-center text-purple-600 font-medium">
              Continue as Freelancer
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>

        <p className="mt-8 text-center text-dark-400 text-sm">
          You can change your role later from your account settings.
        </p>
      </motion.div>
    </div>
  );
};

export default RoleSelection;