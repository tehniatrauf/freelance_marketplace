// frontend/src/components/freelancer/MyApplications.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaEye,
  FaStar,
  FaBriefcase,
  FaFilter,
  FaUserCheck
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const MyApplications = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // Fetch freelancer's applications
      const response = await api.get('/applications/my');
      const apps = response.data.applications || [];
      
      setApplications(apps);
      
      // Calculate stats
      setStats({
        total: apps.length,
        pending: apps.filter(a => a.status === 'pending').length,
        shortlisted: apps.filter(a => a.status === 'shortlisted').length,
        hired: apps.filter(a => a.status === 'accepted' || a.status === 'hired').length,
        rejected: apps.filter(a => a.status === 'rejected').length
      });

    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) return;
    
    try {
      await api.delete(`/applications/${applicationId}`);
      toast.success('Application withdrawn successfully');
      fetchApplications(); // Refresh
    } catch (error) {
      console.error('Error withdrawing application:', error);
      toast.error('Failed to withdraw application');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { icon: <FaHourglassHalf />, class: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
      shortlisted: { icon: <FaClock />, class: 'bg-blue-100 text-blue-700', label: 'Shortlisted' },
      accepted: { icon: <FaCheckCircle />, class: 'bg-green-100 text-green-700', label: 'Accepted' },
      hired: { icon: <FaCheckCircle />, class: 'bg-green-100 text-green-700', label: 'Hired' },
      rejected: { icon: <FaTimesCircle />, class: 'bg-red-100 text-red-700', label: 'Rejected' },
      interview: { icon: <FaUserCheck />, class: 'bg-purple-100 text-purple-700', label: 'Interview' }
    };
    return config[status] || config.pending;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.job?.client?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading applications...</p>
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
        <h1 className="text-3xl font-bold text-dark-900">My Applications</h1>
        <p className="text-dark-600 mt-2">
          Track all your job applications in one place
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6"
      >
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total</p>
              <p className="text-2xl font-bold text-dark-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-500">
              <FaHourglassHalf className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Shortlisted</p>
              <p className="text-2xl font-bold text-blue-600">{stats.shortlisted}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaClock className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Hired</p>
              <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaCheckCircle className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
              <FaTimesCircle className="text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Search Applications
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search by job title or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-primary pl-12"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="accepted">Accepted</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
              <option value="interview">Interview</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app, index) => {
            const status = getStatusBadge(app.status);
            const job = app.job || {};
            const client = job.client || {};
            
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={client.avatar || `https://ui-avatars.com/api/?name=${client.name || 'Client'}`}
                    alt={client.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link to={`/freelancer/job/${job.id}`}>
                          <h3 className="text-xl font-semibold text-dark-900 hover:text-blue-600 transition-colors">
                            {job.title || 'Job'}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 mt-1 text-sm text-dark-500">
                          <span className="font-medium text-dark-700">{client.name || 'Unknown Client'}</span>
                          <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            {client.rating || 0}
                          </span>
                          <span>•</span>
                          <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-dark-600">
                      <span>Budget: <span className="font-semibold text-dark-900">{job.budget || 'N/A'}</span></span>
                      <span>My Bid: <span className="font-semibold text-dark-900">${app.proposedBudget}</span></span>
                      <span>Delivery: <span className="font-semibold text-dark-900">{app.estimatedDelivery}</span></span>
                    </div>

                    <p className="mt-2 text-dark-600 text-sm line-clamp-2">
                      {app.coverLetter}
                    </p>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      <Link
                        to={`/freelancer/job/${job.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-dark-700 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        <FaEye />
                        View Job
                      </Link>
                      {app.status === 'pending' && (
                        <button
                          onClick={() => handleWithdraw(app.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                        >
                          <FaTimesCircle />
                          Withdraw
                        </button>
                      )}
                      {app.status === 'accepted' || app.status === 'hired' && (
                        <Link
                          to="/freelancer/projects"
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                        >
                          <FaBriefcase />
                          Go to Project
                        </Link>
                      )}
                      {app.status === 'shortlisted' && (
                        <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl">
                          <FaUserCheck />
                          Waiting for interview
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-3xl text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No applications found</h3>
            <p className="text-dark-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'You haven\'t applied to any jobs yet.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/freelancer/find-jobs"
                className="inline-block mt-4 btn-primary"
              >
                Browse Jobs
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;