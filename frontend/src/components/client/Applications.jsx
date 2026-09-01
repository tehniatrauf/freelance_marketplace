// frontend/src/components/client/Applications.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaStar,
  FaUserCheck,
  FaUserTimes,
  FaComments,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaBriefcase
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Applications = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    shortlisted: 0,
    hired: 0
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // Get all jobs posted by client
      const jobsRes = await api.get('/jobs/client');
      const jobs = jobsRes.data.jobs || [];
      
      // Get applications for each job
      let allApps = [];
      for (const job of jobs) {
        try {
          const appRes = await api.get(`/applications/job/${job.id}`);
          const jobApps = (appRes.data.applications || []).map(app => ({
            ...app,
            jobTitle: job.title,
            jobId: job.id,
            jobBudget: job.budget
          }));
          allApps = [...allApps, ...jobApps];
        } catch (e) {
          // No applications for this job
        }
      }

      setApplications(allApps);
      
      // Calculate stats
      setStats({
        total: allApps.length,
        pending: allApps.filter(a => a.status === 'pending').length,
        shortlisted: allApps.filter(a => a.status === 'shortlisted').length,
        hired: allApps.filter(a => a.status === 'accepted' || a.status === 'hired').length
      });

    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, application) => {
    try {
      const newStatus = action === 'shortlist' ? 'shortlisted' :
                        action === 'hire' ? 'accepted' :
                        action === 'reject' ? 'rejected' : null;

      if (newStatus) {
        await api.put(`/applications/${application.id}/status`, { status: newStatus });
        toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)}ed successfully!`);
        fetchApplications(); // Refresh
      } else if (action === 'message') {
        toast.success(`Opening chat with ${application.freelancer?.name}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to perform action');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      shortlisted: 'bg-blue-100 text-blue-700',
      accepted: 'bg-green-100 text-green-700',
      hired: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      interview: 'bg-purple-100 text-purple-700'
    };
    return styles[status] || styles.pending;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.freelancer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
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
        <h1 className="text-3xl font-bold text-dark-900">Applications</h1>
        <p className="text-dark-600 mt-2">
          Review and manage all job applications
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Total</p>
          <p className="text-2xl font-bold text-dark-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Shortlisted</p>
          <p className="text-2xl font-bold text-blue-600">{stats.shortlisted}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Hired</p>
          <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search by freelancer or job..."
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
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="interview">Interview</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Freelancer Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <img
                      src={app.freelancer?.avatar || `https://ui-avatars.com/api/?name=${app.freelancer?.name}`}
                      alt={app.freelancer?.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-semibold text-dark-900">
                          {app.freelancer?.name || 'Unknown'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                          {app.status?.charAt(0).toUpperCase() + app.status?.slice(1) || 'Pending'}
                        </span>
                      </div>
                      <div className="text-dark-600">{app.freelancer?.title || 'Freelancer'}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-dark-500">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {app.freelancer?.rating || 0}
                        </span>
                        <span>•</span>
                        <span>Bid: ${app.proposedBudget}</span>
                        <span>•</span>
                        <span>Delivery: {app.estimatedDelivery}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {app.freelancer?.skills?.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-dark-600 text-sm line-clamp-2">{app.coverLetter}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-48 flex flex-row lg:flex-col gap-2 lg:justify-center">
                  {app.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAction('shortlist', app)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        <FaUserCheck /> Shortlist
                      </button>
                      <button
                        onClick={() => handleAction('reject', app)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        <FaUserTimes /> Reject
                      </button>
                    </>
                  )}
                  {app.status === 'shortlisted' && (
                    <>
                      <button
                        onClick={() => handleAction('hire', app)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <FaCheck /> Hire
                      </button>
                      <button
                        onClick={() => handleAction('reject', app)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleAction('message', app)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-dark-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <FaComments /> Message
                  </button>
                  <Link
                    to={`/freelancer/profile/${app.freelancer?.id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-dark-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <FaEye /> View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-3xl text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No applications found</h3>
            <p className="text-dark-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Post a job to start receiving applications.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link to="/client/post-job" className="inline-block mt-4 btn-primary">
                Post a Job
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;