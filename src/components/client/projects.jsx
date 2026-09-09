// src/components/client/Projects.jsx
import React, { useState } from 'react';
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
  FaThumbsDown
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ClientProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [projects] = useState([
    {
      id: 1,
      title: 'E-Commerce Website Development',
      freelancer: {
        name: 'John Smith',
        title: 'Full Stack Developer',
        rating: 4.8,
        avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff'
      },
      budget: '$350',
      startDate: '2024-03-01',
      deadline: '2024-03-20',
      status: 'in_progress',
      progress: 65,
      description: 'Building a fully functional e-commerce website with payment integration.',
      submissions: [
        {
          id: 1,
          title: 'Initial Design Concepts',
          submittedAt: '2024-03-05',
          status: 'approved'
        },
        {
          id: 2,
          title: 'Development Progress',
          submittedAt: '2024-03-10',
          status: 'pending'
        }
      ],
      messages: 12,
      unread: 3
    },
    {
      id: 2,
      title: 'Mobile App Design',
      freelancer: {
        name: 'Sarah Lee',
        title: 'UI/UX Designer',
        rating: 4.9,
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=22c55e&color=fff'
      },
      budget: '$800',
      startDate: '2024-02-15',
      deadline: '2024-03-15',
      status: 'submitted',
      progress: 100,
      description: 'Designing a mobile app for health tracking with modern UI/UX.',
      submissions: [
        {
          id: 1,
          title: 'Final Design',
          submittedAt: '2024-03-14',
          status: 'pending_review'
        }
      ],
      messages: 8,
      unread: 0
    },
    {
      id: 3,
      title: 'Logo Design for Startup',
      freelancer: {
        name: 'Mike Johnson',
        title: 'Graphic Designer',
        rating: 4.7,
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=d946ef&color=fff'
      },
      budget: '$200',
      startDate: '2024-02-20',
      deadline: '2024-03-01',
      status: 'completed',
      progress: 100,
      description: 'Created a modern logo design for a tech startup.',
      submissions: [
        {
          id: 1,
          title: 'Final Logo Design',
          submittedAt: '2024-02-28',
          status: 'approved'
        }
      ],
      messages: 5,
      unread: 0
    }
  ]);

  const getStatusBadge = (status) => {
    const config = {
      in_progress: { icon: <FaClock />, class: 'bg-blue-100 text-blue-700', label: 'In Progress' },
      submitted: { icon: <FaClock />, class: 'bg-yellow-100 text-yellow-700', label: 'Submitted' },
      completed: { icon: <FaCheckCircle />, class: 'bg-green-100 text-green-700', label: 'Completed' },
      pending_review: { icon: <FaHourglassHalf />, class: 'bg-orange-100 text-orange-700', label: 'Pending Review' }
    };
    return config[status] || config.in_progress;
  };

  const handleApproveWork = (projectId) => {
    toast.success('Work approved successfully!');
  };

  const handleRequestRevision = (projectId) => {
    toast.success('Revision requested');
  };

  const handleCompleteProject = (projectId) => {
    setSelectedProject(projectId);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    toast.success('Review submitted successfully!');
    setShowReviewModal(false);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark-900">My Projects</h1>
        <p className="text-dark-600 mt-2">
          Manage all your active and completed projects
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Projects</p>
              <p className="text-2xl font-bold text-dark-900">{projects.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">In Progress</p>
              <p className="text-2xl font-bold text-dark-900">
                {projects.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaClock className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Completed</p>
              <p className="text-2xl font-bold text-dark-900">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaCheckCircle className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Spent</p>
              <p className="text-2xl font-bold text-dark-900">
                ${projects.reduce((sum, p) => sum + parseInt(p.budget.replace('$', '')), 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Search Projects
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search by project or freelancer..."
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
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="completed">Completed</option>
              <option value="pending_review">Pending Review</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {filteredProjects.map((project, index) => {
          const status = getStatusBadge(project.status);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={project.freelancer.avatar}
                  alt={project.freelancer.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-dark-900">{project.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-dark-500">
                        <span className="font-medium text-dark-700">{project.freelancer.name}</span>
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {project.freelancer.rating}
                        </span>
                        <span>•</span>
                        <span>Started: {project.startDate}</span>
                        <span>•</span>
                        <span>Due: {project.deadline}</span>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
                      {status.icon}
                      {status.label}
                    </span>
                  </div>

                  <p className="mt-2 text-dark-600">{project.description}</p>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-dark-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`rounded-full h-2 transition-all duration-500 ${
                          project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <Link
                      to={`/client/projects/${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-dark-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <FaEye />
                      View Details
                    </Link>
                    <Link
                      to="/client/messages"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <FaComments />
                      Message ({project.unread > 0 ? project.unread : 0})
                    </Link>
                    {project.status === 'submitted' && (
                      <>
                        <button
                          onClick={() => handleApproveWork(project.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                        >
                          <FaThumbsUp />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestRevision(project.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                        >
                          <FaThumbsDown />
                          Request Revision
                        </button>
                      </>
                    )}
                    {project.status === 'in_progress' && (
                      <button
                        onClick={() => handleCompleteProject(project.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <FaCheckCircle />
                        Complete Project
                      </button>
                    )}
                  </div>

                  {project.submissions && project.submissions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-dark-700 mb-2">Submissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.submissions.map((sub) => (
                          <span
                            key={sub.id}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              sub.status === 'approved' 
                                ? 'bg-green-100 text-green-700'
                                : sub.status === 'pending_review'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            <FaFileAlt />
                            {sub.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-3xl text-dark-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">No projects found</h3>
            <p className="text-dark-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'You don\'t have any projects yet.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/client/post-job"
                className="inline-block mt-4 btn-primary"
              >
                Post a Job
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-dark-900">Complete Project</h2>
              <p className="text-dark-500">Leave a review for the freelancer</p>
            </div>
            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Rating *
                </label>
                <div className="flex gap-2 text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Review *
                </label>
                <textarea
                  rows={4}
                  className="input-primary"
                  placeholder="Write your review..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Quality of Work
                  </label>
                  <select className="input-primary">
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Below Average</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Communication
                  </label>
                  <select className="input-primary">
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Below Average</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Timeliness
                  </label>
                  <select className="input-primary">
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Below Average</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Professionalism
                  </label>
                  <select className="input-primary">
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Below Average</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Submit Review & Complete
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClientProjects;
