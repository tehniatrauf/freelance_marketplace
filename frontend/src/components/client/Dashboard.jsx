// frontend/src/components/client/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaUsers, 
  FaCheckCircle, 
  FaClock,
  FaPlus,
  FaComments,
  FaUserCheck
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    jobsPosted: 0,
    activeJobs: 0,
    applications: 0,
    hiredFreelancers: 0,
    completedJobs: 0,
    averageRating: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs
      const jobsRes = await api.get('/jobs/client');
      const jobs = jobsRes.data.jobs || [];
      
      // Calculate stats
      const activeJobs = jobs.filter(j => j.status === 'active').length;
      const completedJobs = jobs.filter(j => j.status === 'completed').length;
      
      setStats({
        jobsPosted: jobs.length,
        activeJobs: activeJobs,
        applications: jobs.reduce((sum, j) => sum + (j.applications?.length || 0), 0),
        hiredFreelancers: jobs.filter(j => j.hiredFreelancer).length,
        completedJobs: completedJobs,
        averageRating: 4.7 // Will be calculated from reviews
      });

      setRecentJobs(jobs.slice(0, 3));

      // Chart data (mock for now - replace with real data)
      setChartData([
        { month: 'Jan', jobs: 3, hires: 2 },
        { month: 'Feb', jobs: 5, hires: 3 },
        { month: 'Mar', jobs: 7, hires: 4 },
        { month: 'Apr', jobs: 4, hires: 3 },
        { month: 'May', jobs: 6, hires: 5 },
        { month: 'Jun', jobs: 8, hires: 6 }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Client'}! 👋</h1>
            <p className="mt-2 text-blue-100">
              Here's what's happening with your projects today.
            </p>
          </div>
          <Link
            to="/client/post-job"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <FaPlus />
            Post New Job
          </Link>
        </div>
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
              <p className="text-sm text-dark-500">Jobs Posted</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.jobsPosted}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {stats.activeJobs} jobs in progress
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
              <p className="text-sm text-dark-500">Applications</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.applications}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
              <FaUsers className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {stats.applications} total applications
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
              <p className="text-sm text-dark-500">Hired Freelancers</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.hiredFreelancers}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
              <FaUserCheck className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-purple-600">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            {stats.completedJobs} jobs completed
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
              <p className="text-sm text-dark-500">Average Rating</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.averageRating}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-500">
              <FaCheckCircle className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            ⭐ {stats.averageRating} average rating
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-dark-900 mb-4">Activity Overview</h3>
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
              dataKey="jobs" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6' }}
            />
            <Line 
              type="monotone" 
              dataKey="hires" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ClientDashboard;