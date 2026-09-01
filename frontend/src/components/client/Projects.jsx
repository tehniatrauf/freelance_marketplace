// frontend/src/components/client/Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaEye,
  FaStar,
  FaBriefcase,
  FaComments,
  FaDollarSign,
  FaFileAlt,
  FaDownload,
  FaThumbsUp,
  FaThumbsDown,
  FaFilter
} from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ClientProjects = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    submitted: 0,
    completed: 0
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    communication: 5,
    quality: 5,
    timeliness: 5,
    professionalism: 5,
    comment: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects/client');
      const projectsData = response.data.projects || [];
      setProjects(projectsData);

      setStats({
        total: projectsData.length,
        inProgress: projectsData.filter(p => p.status === 'in_progress').length,
        submitted: projectsData.filter(p => p.status === 'submitted' || p.status === 'pending_review').length,
        completed: projectsData.filter(p => p.status === 'completed').length
      });

    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveWork = async (projectId, submissionId) => {
    try {
      await api.post(`/projects/${projectId}/approve`, { submissionId });
      toast.success('Work approved successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error approving work:', error);
      toast.error('Failed to approve work');
    }
  };

  const handleRequestRevision = async (projectId, submissionId) => {
    const feedback = prompt('Enter feedback for revision:');
    if (feedback === null) return;
    
    try {
      await api.post(`/projects/${projectId}/revision`, { submissionId, feedback });
      toast.success('Revision requested');
      fetchProjects();
    } catch (error) {
      console.error('Error requesting revision:', error);
      toast.error('Failed to request revision');
    }
  };

  const handleCompleteProject = (project) => {
    setSelectedProject(project);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/reviews', {
        projectId: selectedProject.id,
        rating: reviewData.rating,
        communication: reviewData.communication,
        quality: reviewData.quality,
        timeliness: reviewData.timeliness,
        professionalism: reviewData.professionalism,
        comment: reviewData.comment
      });
      
      toast.success('Review submitted and project completed!');
      setShowReviewModal(false);
      setReviewData({ rating: 5, communication: 5, quality: 5, timeliness: 5, professionalism: 5, comment: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      in_progress: { icon: <FaClock />, class: 'bg-blue-100 text-blue-700', label: 'In Progress' },
      submitted: { icon: <FaClock />, class: 'bg-yellow-100 text-yellow-700', label: 'Submitted' },
      completed: { icon: <FaCheckCircle />, class: 'bg-green-100 text-green-700', label: 'Completed' },
      pending_review: { icon: <FaHourglassHalf />, class: 'bg-orange-100 text-orange-700', label: 'Pending Review' },
      revision_requested: { icon: <FaHourglassHalf />, class: 'bg-red-100 text-red-700', label: 'Revision Requested' },
      approved: { icon: <FaCheckCircle />, class: 'bg-green-100 text-green-700', label: 'Approved' }
    };
    return config[status] || config.in_progress;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.freelancer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">My Projects</h1>
        <p className="text-dark-600 mt-2">Manage all your active and completed projects</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-dark-500">Total Projects</p><p className="text-2xl font-bold text-dark-900">{stats.total}</p></div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500"><FaBriefcase className="text-xl" /></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-dark-500">In Progress</p><p className="text-2xl font-bold text-dark-900">{stats.inProgress}</p></div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500"><FaClock className="text-xl" /></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-dark-500">Submitted</p><p className="text-2xl font-bold text-yellow-600">{stats.submitted}</p></div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-500"><FaHourglassHalf className="text-xl" /></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-dark-500">Completed</p><p className="text-2xl font-bold text-green-600">{stats.completed}</p></div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500"><FaCheckCircle className="text-xl" /></div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Search Projects</label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input type="text" placeholder="Search by project or freelancer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-12" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-primary">
              <option value="all">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="pending_review">Pending Review</option>
              <option value="completed">Completed</option>
              <option value="revision_requested">Revision Requested</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            const status = getStatusBadge(project.status);
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <img src={project.freelancer?.avatar || `https://ui-avatars.com/api/?name=${project.freelancer?.name}`} alt={project.freelancer?.name} className="w-14 h-14 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-dark-900">{project.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-dark-500">
                          <span className="font-medium text-dark-700">{project.freelancer?.name || 'Unknown'}</span>
                          <span className="flex items-center gap-1"><FaStar className="text-yellow-400" />{project.freelancer?.rating || 0}</span>
                          <span>•</span>
                          <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>{status.icon} {status.label}</span>
                    </div>

                    <p className="mt-2 text-dark-600">{project.description}</p>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-dark-500 mb-1"><span>Progress</span><span>{project.progress || 0}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`rounded-full h-2 transition-all duration-500 ${project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${project.progress || 0}%` }}></div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      <Link to={`/client/projects/${project.id}`} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-dark-700 rounded-xl hover:bg-gray-200 transition-colors"><FaEye /> View Details</Link>
                      <Link to="/client/messages" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"><FaComments /> Message ({project.unread || 0})</Link>
                      {project.status === 'submitted' || project.status === 'pending_review' && (
                        <>
                          <button onClick={() => handleApproveWork(project.id, project.submissions?.[0]?.id)} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"><FaThumbsUp /> Approve</button>
                          <button onClick={() => handleRequestRevision(project.id, project.submissions?.[0]?.id)} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"><FaThumbsDown /> Request Revision</button>
                        </>
                      )}
                      {project.status === 'in_progress' && (
                        <button onClick={() => handleCompleteProject(project)} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"><FaCheckCircle /> Complete Project</button>
                      )}
                    </div>

                    {project.submissions?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-dark-700 mb-2">Submissions:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.submissions.map((sub, idx) => (
                            <span key={idx} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${sub.status === 'approved' ? 'bg-green-100 text-green-700' : sub.status === 'pending_review' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}><FaFileAlt /> {sub.title}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"><FaSearch className="text-3xl text-dark-400" /></div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No projects found</h3>
            <p className="text-dark-500">{searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filters.' : 'You don\'t have any projects yet.'}</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100"><h2 className="text-2xl font-bold text-dark-900">Complete Project</h2><p className="text-dark-500">Leave a review for the freelancer</p></div>
            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">Rating *</label>
                <div className="flex gap-2 text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewData({ ...reviewData, rating: star })} className={`${reviewData.rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}>★</button>
                  ))}
                </div>
              </div>
              <div><label className="block text-sm font-medium text-dark-700 mb-2">Review *</label><textarea rows={4} className="input-primary" value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} required /></div>
              <div className="grid grid-cols-2 gap-4">
                {['communication', 'quality', 'timeliness', 'professionalism'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-dark-700 mb-2 capitalize">{field}</label>
                    <select className="input-primary" value={reviewData[field]} onChange={(e) => setReviewData({ ...reviewData, [field]: parseInt(e.target.value) })}>
                      {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} - {num === 5 ? 'Excellent' : num === 4 ? 'Good' : num === 3 ? 'Average' : num === 2 ? 'Below Average' : 'Poor'}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">Submit Review & Complete</button>
                <button type="button" onClick={() => setShowReviewModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50 transition-colors">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClientProjects;