// src/components/admin/Jobs.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch,
  FaFilter,
  FaEye,
  FaTrash,
  FaBan,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaUser,
  FaBriefcase,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('posted');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const [jobs] = useState([
    {
      id: 1,
      title: 'Build E-Commerce Website',
      client: 'ABC Company',
      category: 'Web Development',
      budget: '$400 - $600',
      status: 'active',
      posted: '2024-03-01',
      applications: 15,
      views: 87,
      skills: ['PHP', 'MySQL', 'JavaScript'],
      avatar: 'https://ui-avatars.com/api/?name=ABC+Company&background=3b82f6&color=fff',
      reported: false
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'TechStart Inc.',
      category: 'Mobile Development',
      budget: '$800',
      status: 'reported',
      posted: '2024-03-02',
      applications: 8,
      views: 45,
      skills: ['React Native', 'Node.js'],
      avatar: 'https://ui-avatars.com/api/?name=TechStart+Inc&background=22c55e&color=fff',
      reported: true
    },
    {
      id: 3,
      title: 'Logo Design for Startup',
      client: 'StartupX',
      category: 'Design & Creative',
      budget: '$200',
      status: 'completed',
      posted: '2024-02-28',
      applications: 22,
      views: 120,
      skills: ['Photoshop', 'Illustrator'],
      avatar: 'https://ui-avatars.com/api/?name=StartupX&background=d946ef&color=fff',
      reported: false
    },
    {
      id: 4,
      title: 'Content Writing for Blog',
      client: 'ContentHub',
      category: 'Writing & Translation',
      budget: '$150',
      status: 'active',
      posted: '2024-02-25',
      applications: 12,
      views: 60,
      skills: ['Content Writing', 'SEO'],
      avatar: 'https://ui-avatars.com/api/?name=ContentHub&background=ef4444&color=fff',
      reported: false
    },
    {
      id: 5,
      title: 'API Development Project',
      client: 'API Solutions',
      category: 'Web Development',
      budget: '$500',
      status: 'reported',
      posted: '2024-02-20',
      applications: 5,
      views: 30,
      skills: ['Node.js', 'Express', 'PostgreSQL'],
      avatar: 'https://ui-avatars.com/api/?name=API+Solutions&background=8b5cf6&color=fff',
      reported: true
    }
  ]);

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design & Creative',
    'Writing & Translation',
    'Video & Animation',
    'Digital Marketing',
    'Data Science',
    'AI & Machine Learning'
  ];

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      reported: 'bg-red-100 text-red-700',
      closed: 'bg-gray-100 text-gray-700',
      draft: 'bg-yellow-100 text-yellow-700'
    };
    return styles[status] || styles.draft;
  };

  const handleAction = (action, job) => {
    const messages = {
      remove: `Job "${job.title}" has been removed!`,
      block: `Job "${job.title}" has been blocked!`,
      approve: `Job "${job.title}" has been approved!`,
      report: `Job "${job.title}" has been reported!`
    };
    toast.success(messages[action] || 'Action completed');
    setShowActionModal(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Job Management</h1>
            <p className="text-dark-600 mt-2">
              Manage all job postings on the platform
            </p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
              <FaBan />
              {jobs.filter(j => j.reported).length} Reported
            </span>
          </div>
        </div>
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
              <p className="text-sm text-dark-500">Total Jobs</p>
              <p className="text-2xl font-bold text-dark-900">{jobs.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Active</p>
              <p className="text-2xl font-bold text-dark-900">
                {jobs.filter(j => j.status === 'active').length}
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
              <p className="text-sm text-dark-500">Completed</p>
              <p className="text-2xl font-bold text-dark-900">
                {jobs.filter(j => j.status === 'completed').length}
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
              <p className="text-sm text-dark-500">Reported</p>
              <p className="text-2xl font-bold text-dark-900">
                {jobs.filter(j => j.reported).length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
              <FaBan className="text-xl" />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Search
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search jobs..."
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="reported">Reported</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-primary"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterCategory('all');
              }}
              className="text-dark-500 hover:text-dark-700 transition-colors flex items-center gap-2"
            >
              <FaFilter />
              Clear Filters
            </button>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Job
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:text-dark-700"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    Category
                    {sortBy === 'category' && (
                      sortOrder === 'asc' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:text-dark-700"
                  onClick={() => handleSort('budget')}
                >
                  <div className="flex items-center gap-1">
                    Budget
                    {sortBy === 'budget' && (
                      sortOrder === 'asc' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:text-dark-700"
                  onClick={() => handleSort('posted')}
                >
                  <div className="flex items-center gap-1">
                    Posted
                    {sortBy === 'posted' && (
                      sortOrder === 'asc' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                <motion.tr
                  key={job.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.avatar}
                        alt={job.client}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-dark-900">{job.title}</div>
                        <div className="text-sm text-dark-500">{job.client}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {job.skills.slice(0, 2).map((skill, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 2 && (
                            <span className="text-xs text-dark-400">+{job.skills.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-600">
                    {job.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-dark-900">
                    {job.budget}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-500">
                    {job.posted}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      {job.reported && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          <FaBan className="text-xs" />
                          Reported
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/client/job/${job.id}`}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      >
                        <FaEye />
                      </Link>
                      {job.reported ? (
                        <button
                          onClick={() => handleAction('approve', job)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                        >
                          <FaCheckCircle />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction('block', job)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <FaBan />
                        </button>
                      )}
                      <button
                        onClick={() => handleAction('remove', job)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;