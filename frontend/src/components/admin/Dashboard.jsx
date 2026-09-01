// src/components/admin/Dashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaBriefcase, 
  FaCheckCircle, 
  FaClock,
  FaStar,
  FaChartLine,
  FaUserPlus,
  FaFileAlt,
  FaExclamationTriangle,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1250,
    totalFreelancers: 780,
    totalClients: 420,
    totalJobs: 340,
    activeJobs: 85,
    completedJobs: 210,
    totalRevenue: '$45,230',
    pendingReviews: 12,
    reportedUsers: 3,
    reportedJobs: 5
  });

  const [recentUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'freelancer',
      joined: '2024-03-01',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff'
    },
    {
      id: 2,
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      role: 'client',
      joined: '2024-03-02',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=22c55e&color=fff'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'freelancer',
      joined: '2024-03-03',
      status: 'suspended',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=d946ef&color=fff'
    }
  ]);

  const [recentJobs] = useState([
    {
      id: 1,
      title: 'Build E-Commerce Website',
      client: 'ABC Company',
      status: 'active',
      budget: '$400 - $600',
      posted: '2024-03-01'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'TechStart Inc.',
      status: 'reported',
      budget: '$800',
      posted: '2024-03-02'
    },
    {
      id: 3,
      title: 'Logo Design for Startup',
      client: 'StartupX',
      status: 'completed',
      budget: '$200',
      posted: '2024-02-28'
    }
  ]);

  const chartData = [
    { month: 'Jan', users: 120, jobs: 45, revenue: 5000 },
    { month: 'Feb', users: 150, jobs: 55, revenue: 6200 },
    { month: 'Mar', users: 180, jobs: 65, revenue: 7800 },
    { month: 'Apr', users: 200, jobs: 70, revenue: 8500 },
    { month: 'May', users: 230, jobs: 80, revenue: 9200 },
    { month: 'Jun', users: 250, jobs: 85, revenue: 10500 }
  ];

  const pieData = [
    { name: 'Freelancers', value: 780 },
    { name: 'Clients', value: 420 },
    { name: 'Admins', value: 50 }
  ];

  const COLORS = ['#3B82F6', '#22C55E', '#8B5CF6'];

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    suspended: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
    reported: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark-900">Admin Dashboard</h1>
        <p className="text-dark-600 mt-2">
          Overview of your platform's performance and metrics
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Users</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaUsers className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>12% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Jobs</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.totalJobs}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>8% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Revenue</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.totalRevenue}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>15% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Pending Reviews</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.pendingReviews}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
              <FaClock className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-orange-600">
            <FaArrowUp />
            <span>3 new this week</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Platform Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6' }}
              />
              <Line 
                type="monotone" 
                dataKey="jobs" 
                stroke="#22C55E" 
                strokeWidth={3}
                dot={{ fill: '#22C55E' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-dark-900">Recent Users</h3>
            <Link to="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-dark-900">{user.name}</div>
                    <div className="text-sm text-dark-500">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  <span className="text-xs text-dark-400 capitalize">{user.role}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-dark-900">Recent Jobs</h3>
            <Link to="/admin/jobs" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium text-dark-900">{job.title}</div>
                  <div className="text-sm text-dark-500">{job.client}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <span className="text-xs text-dark-400">{job.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaExclamationTriangle className="text-red-500 text-xl" />
            <h3 className="text-lg font-semibold text-red-700">Alerts</h3>
          </div>
          <ul className="space-y-2 text-red-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              {stats.reportedUsers} users reported
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              {stats.reportedJobs} jobs reported
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              {stats.pendingReviews} pending reviews
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/admin/users"
              className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FaUsers className="text-blue-500" />
              <span className="text-sm font-medium">Manage Users</span>
            </Link>
            <Link
              to="/admin/jobs"
              className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FaBriefcase className="text-green-500" />
              <span className="text-sm font-medium">Manage Jobs</span>
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FaChartLine className="text-purple-500" />
              <span className="text-sm font-medium">View Reports</span>
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FaFileAlt className="text-orange-500" />
              <span className="text-sm font-medium">Manage Categories</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors"
            >
              <FaUserPlus className="text-teal-500" />
              <span className="text-sm font-medium">Platform Settings</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;