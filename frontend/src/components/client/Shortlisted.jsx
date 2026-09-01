// frontend/src/components/client/Shortlisted.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaComments, 
  FaUserCheck,
  FaUserTimes,
  FaCheck,
  FaClock,
  FaSearch,
  FaBriefcase,
  FaFilter
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Shortlisted = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [shortlisted, setShortlisted] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    interview: 0,
    hired: 0
  });

  useEffect(() => {
    fetchShortlisted();
  }, []);

  const fetchShortlisted = async () => {
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
          const jobApps = (appRes.data.applications || [])
            .filter(app => app.status === 'shortlisted' || app.status === 'interview' || app.status === 'accepted')
            .map(app => ({
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

      setShortlisted(allApps);
      
      // Calculate stats
      setStats({
        total: allApps.length,
        shortlisted: allApps.filter(a => a.status === 'shortlisted').length,
        interview: allApps.filter(a => a.status === 'interview').length,
        hired: allApps.filter(a => a.status === 'accepted' || a.status === 'hired').length
      });

    } catch (error) {
      console.error('Error fetching shortlisted:', error);
      toast.error('Failed to load shortlisted candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, application) => {
    try {
      const newStatus = action === 'hire' ? 'accepted' :
                        action === 'interview' ? 'interview' :
                        action === 'reject' ? 'rejected' : null;

      if (newStatus) {
        await api.put(`/applications/${application.id}/status`, { status: newStatus });
        toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)}ed successfully!`);
        fetchShortlisted(); // Refresh
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
      shortlisted: 'bg-blue-100 text-blue-700',
      interview: 'bg-purple-100 text-purple-700',
      accepted: 'bg-green-100 text-green-700',
      hired: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return styles[status] || styles.shortlisted;
  };

  const filteredShortlisted = shortlisted.filter(item =>
    item.freelancer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.freelancer?.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading shortlisted candidates...</p>
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
        <h1 className="text-3xl font-bold text-dark-900">Shortlisted Freelancers</h1>
        <p className="text-dark-600 mt-2">
          Manage your shortlisted candidates and schedule interviews
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Total Shortlisted</p>
          <p className="text-2xl font-bold text-dark-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Shortlisted</p>
          <p className="text-2xl font-bold text-blue-600">{stats.shortlisted}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Interview</p>
          <p className="text-2xl font-bold text-purple-600">{stats.interview}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <p className="text-sm text-dark-500">Hired</p>
          <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search shortlisted freelancers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-primary pl-12"
          />
        </div>
      </div>

      {/* Shortlisted List */}
      <div className="space-y-4">
        {filteredShortlisted.length > 0 ? (
          filteredShortlisted.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Freelancer Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.freelancer?.avatar || `https://ui-avatars.com/api/?name=${item.freelancer?.name}`}
                      alt={item.freelancer?.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-semibold text-dark-900">
                          {item.freelancer?.name || 'Unknown'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                          {item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Shortlisted'}
                        </span>
                      </div>
                      <div className="text-dark-600">{item.freelancer?.title || 'Freelancer'}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-dark-500">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {item.freelancer?.rating || 0}
                        </span>
                        <span>•</span>
                        <span>{item.freelancer?.experience || 'N/A'}</span>
                        <span>•</span>
                        <span>${item.freelancer?.hourlyRate || 0}/hr</span>
                        <span>•</span>
                        <span>{item.freelancer?.location || 'N/A'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.freelancer?.skills?.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                        {item.freelancer?.skills?.length > 4 && (
                          <span className="px-3 py-1 bg-gray-50 text-dark-600 rounded-full text-sm">
                            +{item.freelancer.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <span className="text-dark-500">Job:</span>
                        <span className="font-medium text-dark-900 ml-1">{item.jobTitle}</span>
                      </div>
                      <div>
                        <span className="text-dark-500">Bid:</span>
                        <span className="font-semibold text-dark-900 ml-1">${item.proposedBudget}</span>
                      </div>
                      <div>
                        <span className="text-dark-500">Delivery:</span>
                        <span className="font-semibold text-dark-900 ml-1">{item.estimatedDelivery}</span>
                      </div>
                      <div>
                        <span className="text-dark-500">Applied:</span>
                        <span className="text-dark-900 ml-1">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-dark-600 text-sm line-clamp-2">{item.coverLetter}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:w-48 flex flex-row md:flex-col gap-2 md:justify-center">
                  {item.status === 'shortlisted' && (
                    <>
                      <button
                        onClick={() => handleAction('interview', item)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                      >
                        <FaClock /> Interview
                      </button>
                      <button
                        onClick={() => handleAction('reject', item)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        <FaUserTimes /> Remove
                      </button>
                    </>
                  )}
                  {item.status === 'interview' && (
                    <>
                      <button
                        onClick={() => handleAction('hire', item)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <FaCheck /> Hire
                      </button>
                      <button
                        onClick={() => handleAction('reject', item)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                      >
                        <FaUserTimes /> Remove
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleAction('message', item)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-dark-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <FaComments /> Message
                  </button>
                  <Link
                    to={`/freelancer/profile/${item.freelancer?.id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-dark-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <FaUserCheck /> View Profile
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
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No shortlisted candidates</h3>
            <p className="text-dark-500">
              {searchTerm ? 'Try adjusting your search.' : 'Start shortlisting candidates from your applications.'}
            </p>
            {!searchTerm && (
              <Link to="/client/applications" className="inline-block mt-4 btn-primary">
                View Applications
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlisted;