// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-dark-900">About WorkConnect</h1>
          <p className="mt-4 text-xl text-dark-600 max-w-3xl mx-auto">
            Connecting talent with opportunity since 2024
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-dark-900 mb-4">Our Mission</h2>
            <p className="text-dark-600 leading-relaxed">
              WorkConnect is a two-sided marketplace designed to connect talented freelancers with clients who need their skills. 
              We believe in creating meaningful work opportunities and helping businesses find the perfect talent for their projects.
            </p>
            <p className="text-dark-600 leading-relaxed mt-4">
              Our platform provides a seamless experience for both clients and freelancers, from job posting and discovery to hiring, 
              project management, and completion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-dark-900 mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <span className="text-dark-600">Transparency in all interactions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                <span className="text-dark-600">Quality through verification</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                <span className="text-dark-600">Fair opportunities for all</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                <span className="text-dark-600">Innovation in every feature</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;