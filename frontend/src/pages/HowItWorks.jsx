// src/pages/HowItWorks.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSearch, FaHandshake, FaRocket } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: FaUserPlus,
      title: 'Create Account',
      description: 'Sign up as a client or freelancer and complete your profile.',
      color: 'blue',
    },
    {
      icon: FaSearch,
      title: 'Post or Find Jobs',
      description: 'Clients post jobs, freelancers browse and apply to opportunities.',
      color: 'green',
    },
    {
      icon: FaHandshake,
      title: 'Connect & Hire',
      description: 'Review applications, interview candidates, and start working together.',
      color: 'purple',
    },
    {
      icon: FaRocket,
      title: 'Complete & Review',
      description: 'Submit work, receive payments, and leave reviews for future collaborations.',
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-dark-900">How It Works</h1>
          <p className="mt-4 text-xl text-dark-600 max-w-2xl mx-auto">
            Four simple steps to start your freelancing journey on WorkConnect
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = {
              blue: 'bg-blue-500 text-white shadow-blue-500/30',
              green: 'bg-green-500 text-white shadow-green-500/30',
              purple: 'bg-purple-500 text-white shadow-purple-500/30',
              orange: 'bg-orange-500 text-white shadow-orange-500/30',
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-20 h-20 rounded-full ${colors[step.color]} flex items-center justify-center mx-auto text-2xl font-bold shadow-lg`}>
                  {index + 1}
                </div>
                <div className="mt-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <Icon className="text-2xl text-dark-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 mt-4">{step.title}</h3>
                  <p className="mt-2 text-dark-600">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/register" className="btn-primary inline-flex items-center gap-2">
            Get Started Now
            <FaRocket className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;