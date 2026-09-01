// frontend/src/pages/BrowseJobs.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaStar, 
  FaBriefcase, 
  FaClock, 
  FaDollarSign,
  FaMapMarkerAlt,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import api from '../api/axiosConfig';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    experienceLevel: '',
    isRemote: '',
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design & Creative',
    'Writing & Translation',
    'Video & Animation',
    'Digital Marketing',
    'Data Science',
    'AI & Machine Learning',
    'DevOps & Cloud',
    'Blockchain & Crypto',
    'Customer Support',
    'Sales & Marketing',
  ];

  const experienceLevels = ['Entry', 'Intermediate', 'Expert'];

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.append('keyword', searchTerm);
      if (filters.category) params.append('category', filters.category);
      if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
      if (filters.isRemote) params.append('remote', filters.isRemote);
      if (filters.minBudget) params.append('minBudget', filters.minBudget);
      if (filters.maxBudget) params.append('maxBudget', filters.maxBudget);
      
      const response = await api.get(`/jobs?${params.toString()}`);
      
      // Transform API data to match component expectations
      const fetchedJobs = (response.data.jobs || []).map(job => ({
        id: job.id,
        title: job.title,
        client: job.client?.name || 'Unknown Client',
        clientRating: job.client?.rating || 0,
        description: job.description,
        category: job.category,
        skills: job.skills || [],
        budget: job.budget,
        projectType: job.projectType || 'fixed',
        deadline: job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A',
        experienceLevel: job.experienceLevel || 'Intermediate',
        isRemote: job.isRemote || true,
        location: job.location || 'Remote',
        postedAt: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently',
        applications: job.applications?.length || 0,
        avatar: job.client?.avatar || `https://ui-avatars.com/api/?name=${job.client?.name || 'Client'}&background=3b82f6&color=fff`
      }));
      
      setJobs(fetchedJobs);
      setTotalJobs(response.data.pagination?.total || fetchedJobs.length);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minBudget: '',
      maxBudget: '',
      experienceLevel: '',
      isRemote: '',
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-dark-600">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900">Browse Jobs</h1>
          <p className="text-dark-600 mt-2">Find the perfect opportunity for your skills</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-4"
        >
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search jobs by title, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-primary pl-12"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                showFilters 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-dark-700 hover:bg-gray-200'
              }`}
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input-primary"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Experience Level</label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                  className="input-primary"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Remote</label>
                <select
                  value={filters.isRemote}
                  onChange={(e) => setFilters({ ...filters, isRemote: e.target.value })}
                  className="input-primary"
                >
                  <option value="">All</option>
                  <option value="true">Remote Only</option>
                  <option value="false">On-site Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Budget Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minBudget}
                    onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                    className="input-primary flex-1"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                    className="input-primary flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="text-sm text-dark-500 hover:text-dark-700 transition-colors flex items-center gap-1"
              >
                <FaTimes className="text-xs" /> Clear All Filters
              </button>
              <span className="text-sm text-dark-500">{totalJobs} jobs found</span>
            </div>
          </motion.div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Client Avatar */}
                  <img
                    src={job.avatar}
                    alt={job.client}
                    className="w-14 h-14 rounded-full"
                  />
                  
                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/freelancer/job/${job.id}`}>
                      <h3 className="text-xl font-semibold text-dark-900 hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-sm text-dark-500">
                      <span className="font-medium text-dark-700">{job.client}</span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        {job.clientRating}
                      </span>
                      <span>•</span>
                      <span>{job.postedAt}</span>
                    </div>
                    <p className="mt-2 text-dark-600 line-clamp-2">
                      {job.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-3 py-1 bg-gray-50 text-dark-600 rounded-full text-sm">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    {/* Job Meta */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-dark-600">
                      <span className="flex items-center gap-1">
                        <FaDollarSign className="text-green-600" />
                        <span className="font-semibold text-dark-900">{job.budget}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-blue-500" />
                        {job.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-400" />
                        {job.isRemote ? 'Remote' : job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBriefcase className="text-xs" />
                        {job.applications} applications
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex md:flex-col gap-2 md:self-center">
                    <Link
                      to={`/freelancer/job/${job.id}`}
                      className="btn-primary text-center text-sm py-2 px-6"
                    >
                      View Job
                    </Link>
                    <Link
                      to={`/freelancer/apply/${job.id}`}
                      className="btn-secondary text-center text-sm py-2 px-6"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-3xl text-dark-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-900 mb-2">No jobs found</h3>
              <p className="text-dark-500">
                {searchTerm || Object.values(filters).some(f => f) 
                  ? 'Try adjusting your search or filters.' 
                  : 'No jobs have been posted yet. Check back later!'}
              </p>
              {(searchTerm || Object.values(filters).some(f => f)) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;