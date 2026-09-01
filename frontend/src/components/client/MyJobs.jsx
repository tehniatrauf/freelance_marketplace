// frontend/src/components/client/MyJobs.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaFilter,
  FaFileAlt,
  FaSpinner
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const MyJobs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/jobs/client');
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      published: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      closed: 'bg-gray-100 text-gray-700',
      draft: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return styles[status] || styles.draft;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await api.delete(`/jobs/${id}`);
      toast.success('Job deleted successfully!');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleClose = async (id) => {
    try {
      await api.put(`/jobs/${id}`, { status: 'closed' });
      toast.success('Job closed successfully!');
      fetchJobs();
    } catch (error) {
      console.error('Error closing job:', error);
      toast.error('Failed to close job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">My Jobs</h1>
            <p className="text-dark-600 mt-2">
              Manage all your job postings
            </p>
          </div>
          <Link
            to="/client/post-job"
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Post New Job
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Jobs</p>
              <p className="text-2xl font-bold text-dark-900">{jobs.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaFileAlt className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Active</p>
              <p className="text-2xl font-bold text-dark-900">
                {jobs.filter(j => j.status === 'active' || j.status === 'published').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaClock className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Completed</p>
              <p className="text-2xl font-bold text-dark-900">
                {jobs.filter(j => j.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaCheckCircle className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Applications</p>
              <p className="text-2xl font-bold text-dark-900">
                {jobs.reduce((sum, j) => sum + (j.applications?.length || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
              <FaUsers className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Search Jobs</label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search by title, category, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-primary pl-12"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="published">Published</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/client/job/${job.id}`}>
                        <h3 className="text-xl font-semibold text-dark-900 hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-sm text-dark-500">
                        <span className="font-medium text-dark-700">{job.category}</span>
                        <span>•</span>
                        <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{job.applications?.length || 0} applications</span>
                        <span>•</span>
                        <span>{job.views || 0} views</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                      {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || 'Draft'}
                    </span>
                  </div>

                  <p className="mt-2 text-dark-600 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(job.skills || []).slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                    {job.skills?.length > 4 && (
                      <span className="px-3 py-1 bg-gray-50 text-dark-600 rounded-full text-sm">
                        +{job.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-dark-600">
                    <span className="font-semibold text-dark-900">{job.budget}</span>
                    <span>•</span>
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{job.isRemote ? '🌍 Remote' : `📍 ${job.location || 'On-site'}`}</span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:self-center">
                  <Link
                    to={`/client/job/${job.id}`}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <FaEye />
                    <span className="text-sm">View</span>
                  </Link>
                  {(job.status === 'active' || job.status === 'published') && (
                    <button
                      onClick={() => handleClose(job.id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <FaCheckCircle />
                      <span className="text-sm">Close</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <FaTrash />
                    <span className="text-sm">Delete</span>
                  </button>
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
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'You haven\'t posted any jobs yet.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link to="/client/post-job" className="inline-block mt-4 btn-primary">
                Post Your First Job
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;