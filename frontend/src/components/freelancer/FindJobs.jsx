// frontend/src/components/freelancer/FindJobs.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaStar,
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaDollarSign,
  FaBookmark,
  FaRegBookmark,
  FaTimes
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';

const FindJobs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    experienceLevel: '',
    isRemote: '',
    datePosted: '',
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
  ];

  const experienceLevels = ['Entry', 'Intermediate', 'Expert'];

  // Fetch jobs from API
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
      const fetchedJobs = response.data.jobs.map(job => ({
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
        isRemote: job.isRemote,
        location: job.location || 'Remote',
        postedAt: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently',
        applications: job.applications?.length || 0,
        isSaved: false,
        avatar: job.client?.avatar || `https://ui-avatars.com/api/?name=${job.client?.name || 'Client'}&background=3b82f6&color=fff`
      }));
      
      setJobs(fetchedJobs);
      setTotalJobs(response.data.pagination?.total || fetchedJobs.length);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to empty array
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      // Toggle save status
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        // Call API to save/unsave job
        if (job.isSaved) {
          await api.delete(`/jobs/${jobId}/save`);
        } else {
          await api.post(`/jobs/${jobId}/save`);
        }
        
        // Update local state
        setJobs(prev => 
          prev.map(j => 
            j.id === jobId ? { ...j, isSaved: !j.isSaved } : j
          )
        );
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark-900">Find Jobs</h1>
        <p className="text-dark-600 mt-2">
          Discover opportunities that match your skills and experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search jobs by title, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-primary pl-12 pr-4"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            showFilters 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-dark-700 border border-gray-200 hover:border-blue-500'
          }`}
        >
          <FaFilter />
          Filters
        </button>
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Category
                </label>
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
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Experience Level
                </label>
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
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Remote
                </label>
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
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Budget Range
                </label>
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

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setFilters({
                    category: '',
                    minBudget: '',
                    maxBudget: '',
                    experienceLevel: '',
                    isRemote: '',
                    datePosted: '',
                  });
                  setSearchTerm('');
                }}
                className="text-sm text-dark-500 hover:text-dark-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6">
        <p className="text-dark-600">
          Found <span className="font-semibold text-dark-900">{totalJobs}</span> jobs
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-500">Sort by:</span>
          <select className="text-sm border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Most Recent</option>
            <option>Highest Budget</option>
            <option>Lowest Budget</option>
            <option>Most Applications</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full skeleton"></div>
                <div className="flex-1">
                  <div className="h-5 w-3/4 skeleton mb-2"></div>
                  <div className="h-4 w-1/2 skeleton mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 skeleton rounded-full"></div>
                    <div className="h-6 w-16 skeleton rounded-full"></div>
                    <div className="h-6 w-16 skeleton rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <img
                  src={job.avatar}
                  alt={job.client}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
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
                    </div>
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {job.isSaved ? (
                        <FaBookmark className="text-blue-500 text-xl" />
                      ) : (
                        <FaRegBookmark className="text-dark-400 text-xl hover:text-blue-500 transition-colors" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-dark-600 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-dark-600">
                    <span className="flex items-center gap-1">
                      <FaDollarSign className="text-green-600" />
                      <span className="font-semibold text-dark-900">{job.budget}</span>
                      <span className="text-dark-400">
                        ({job.projectType})
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-blue-500" />
                      {job.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-400" />
                      {job.isRemote ? 'Remote' : job.location}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      job.experienceLevel === 'Entry' ? 'bg-green-100 text-green-700' :
                      job.experienceLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {job.experienceLevel}
                    </span>
                    <span className="flex items-center gap-1 text-dark-500">
                      <FaBriefcase className="text-xs" />
                      {job.applications} applications
                    </span>
                  </div>
                </div>

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
              Try adjusting your search or filters to find more opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobs;