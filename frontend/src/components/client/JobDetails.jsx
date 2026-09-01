// frontend/src/components/client/JobDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaBriefcase,
  FaUsers,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaFileAlt,
  FaDownload,
  FaShare
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ClientJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data.job);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job details');
      navigate('/client/my-jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${id}`);
      toast.success('Job deleted successfully!');
      setShowDeleteModal(false);
      navigate('/client/my-jobs');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleClose = async () => {
    try {
      await api.put(`/jobs/${id}`, { status: 'closed' });
      toast.success('Job closed successfully!');
      fetchJobDetails();
    } catch (error) {
      console.error('Error closing job:', error);
      toast.error('Failed to close job');
    }
  };

  const handleEdit = () => {
    navigate(`/client/edit-job/${job.id}`);
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
    return styles[status] || styles.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-dark-900">Job not found</h3>
        <Link to="/client/my-jobs" className="btn-primary mt-4 inline-block">
          Back to My Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-dark-600 hover:text-dark-900 transition-colors mb-4">
          <FaArrowLeft /> Back to My Jobs
        </button>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-dark-900">{job.title}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                  {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || 'Draft'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-dark-500">
                <span className="font-medium text-dark-700">{job.category}</span>
                <span>•</span>
                <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{job.views || 0} views</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleEdit} className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-600">
                <FaEdit className="text-xl" />
              </button>
              <button onClick={() => setShowDeleteModal(true)} className="p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors text-red-600">
                <FaTrash className="text-xl" />
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-dark-600">
                <FaShare className="text-xl" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 py-4 border-y border-gray-100">
            <div><p className="text-sm text-dark-500">Budget</p><p className="font-semibold text-dark-900">{job.budget}</p></div>
            <div><p className="text-sm text-dark-500">Deadline</p><p className="font-semibold text-dark-900">{new Date(job.deadline).toLocaleDateString()}</p></div>
            <div><p className="text-sm text-dark-500">Experience</p><p className="font-semibold text-dark-900">{job.experienceLevel}</p></div>
            <div><p className="text-sm text-dark-500">Location</p><p className="font-semibold text-dark-900">{job.isRemote ? '🌍 Remote' : job.location}</p></div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{job.applications?.length || 0}</p>
              <p className="text-sm text-dark-500">Applications</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-sm text-dark-500">Shortlisted</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{job.hiredFreelancer ? 1 : 0}</p>
              <p className="text-sm text-dark-500">Hired</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Job Description</h3>
          <p className="text-dark-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {(job.skills || []).map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </div>

        {job.screeningQuestions?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Screening Questions</h3>
            <ul className="space-y-3">
              {job.screeningQuestions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">{idx + 1}</span>
                  <span className="text-dark-600">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <Link to="/client/applications" className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-lg">
            <FaUsers /> View All Applications
          </Link>
          {(job.status === 'active' || job.status === 'published') && (
            <button onClick={handleClose} className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-dark-700 rounded-xl hover:bg-gray-50 transition-colors">
              <FaCheckCircle /> Close Job
            </button>
          )}
        </div>
      </motion.div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-2xl text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Delete Job?</h3>
              <p className="text-dark-500">Are you sure you want to delete this job? This action cannot be undone.</p>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">Delete Job</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClientJobDetails;