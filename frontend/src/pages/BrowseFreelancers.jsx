// src/pages/BrowseFreelancers.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const BrowseFreelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const freelancers = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Full Stack Developer',
      rating: 4.8,
      skills: ['PHP', 'React', 'Node.js'],
      hourlyRate: '$35/hr',
      location: 'New York, USA',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff',
      completedProjects: 45,
    },
    {
      id: 2,
      name: 'Sarah Lee',
      title: 'UI/UX Designer',
      rating: 4.9,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      hourlyRate: '$40/hr',
      location: 'London, UK',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=22c55e&color=fff',
      completedProjects: 32,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'React Native Developer',
      rating: 4.7,
      skills: ['React Native', 'JavaScript', 'Redux'],
      hourlyRate: '$30/hr',
      location: 'Toronto, CA',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=d946ef&color=fff',
      completedProjects: 28,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900">Browse Freelancers</h1>
          <p className="text-dark-600 mt-2">Find the perfect talent for your project</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search freelancers by name, skills, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-primary pl-12"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer, index) => (
            <motion.div
              key={freelancer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-dark-900">{freelancer.name}</h3>
                  <p className="text-sm text-dark-500">{freelancer.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm font-medium">{freelancer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <FaMapMarkerAlt className="text-dark-400" />
                  {freelancer.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <FaBriefcase className="text-dark-400" />
                  {freelancer.completedProjects} completed projects
                </div>
                <div className="text-lg font-semibold text-dark-900">
                  {freelancer.hourlyRate}
                </div>
              </div>

              <button className="w-full mt-4 btn-primary text-center">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseFreelancers;