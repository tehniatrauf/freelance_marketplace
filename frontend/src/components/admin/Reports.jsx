// src/components/admin/Reports.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload,
  FaCalendar,
  FaChartLine,
  FaUsers,
  FaBriefcase,
  FaDollarSign,
  FaStar,
  FaFileAlt,
  FaPrint,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminReports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('overview');

  const overviewData = {
    totalUsers: 1250,
    totalFreelancers: 780,
    totalClients: 420,
    totalJobs: 340,
    activeJobs: 85,
    completedJobs: 210,
    totalRevenue: '$45,230',
    averageRating: 4.6
  };

  const growthData = [
    { month: 'Jan', users: 120, jobs: 45, revenue: 5000 },
    { month: 'Feb', users: 150, jobs: 55, revenue: 6200 },
    { month: 'Mar', users: 180, jobs: 65, revenue: 7800 },
    { month: 'Apr', users: 200, jobs: 70, revenue: 8500 },
    { month: 'May', users: 230, jobs: 80, revenue: 9200 },
    { month: 'Jun', users: 250, jobs: 85, revenue: 10500 }
  ];

  const categoryData = [
    { name: 'Web Development', value: 120 },
    { name: 'Mobile Development', value: 80 },
    { name: 'Design & Creative', value: 60 },
    { name: 'Writing & Translation', value: 40 },
    { name: 'Digital Marketing', value: 25 },
    { name: 'Other', value: 15 }
  ];

  const ratingData = [
    { rating: '5 Stars', count: 45 },
    { rating: '4 Stars', count: 30 },
    { rating: '3 Stars', count: 15 },
    { rating: '2 Stars', count: 8 },
    { rating: '1 Star', count: 2 }
  ];

  const COLORS = ['#3B82F6', '#22C55E', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

  const handleExport = (format) => {
    console.log(`Exporting as ${format}...`);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Reports</h1>
            <p className="text-dark-600 mt-2">
              View detailed analytics and reports
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <FaFileAlt />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <FaDownload />
              Export CSV
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-dark-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-primary"
            >
              <option value="overview">Overview</option>
              <option value="users">User Report</option>
              <option value="jobs">Job Report</option>
              <option value="revenue">Revenue Report</option>
              <option value="ratings">Rating Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-primary"
            >
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn-primary flex items-center gap-2">
              <FaCalendar />
              Apply Filters
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Users</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{overviewData.totalUsers}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaUsers className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>12% growth</span>
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
              <p className="text-sm text-dark-500">Total Jobs</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{overviewData.totalJobs}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>8% growth</span>
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
              <p className="text-sm text-dark-500">Revenue</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{overviewData.totalRevenue}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>15% growth</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Avg Rating</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{overviewData.averageRating}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-500">
              <FaStar className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <FaArrowUp />
            <span>0.2 increase</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Platform Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
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
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Job Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="rating" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Summary Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-dark-600">Total Freelancers</span>
              <span className="font-semibold text-dark-900">{overviewData.totalFreelancers}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-dark-600">Total Clients</span>
              <span className="font-semibold text-dark-900">{overviewData.totalClients}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-dark-600">Active Jobs</span>
              <span className="font-semibold text-dark-900">{overviewData.activeJobs}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-dark-600">Completed Jobs</span>
              <span className="font-semibold text-dark-900">{overviewData.completedJobs}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-dark-600">Average Rating</span>
              <span className="font-semibold text-dark-900">{overviewData.averageRating} ⭐</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-blue-600 font-medium">Total Revenue</span>
              <span className="font-bold text-blue-600 text-lg">{overviewData.totalRevenue}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReports;