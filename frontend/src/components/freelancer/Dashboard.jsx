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
  FaUserCheck,
  FaStar
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

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
      
      // Fetch applications for all jobs
      let allApplications = [];
      for (const job of jobs) {
        try {
          const appRes = await api.get(`/applications/job/${job.id}`);
          allApplications = [...allApplications, ...(appRes.data.applications || [])];
        } catch (e) {
          // Job might not have applications yet
        }
      }

      // Calculate stats
      const activeJobs = jobs.filter(j => j.status === 'active' || j.status === 'published').length;
      const completedJobs = jobs.filter(j => j.status === 'completed').length;
      const hiredFreelancers = jobs.filter(j => j.hiredFreelancer).length;

      setStats({
        jobsPosted: jobs.length,
        activeJobs: activeJobs,
        applications: allApplications.length,
        hiredFreelancers: hiredFreelancers,
        completedJobs: completedJobs,
        averageRating: 4.7 // Will calculate from reviews later
      });

      // Set recent jobs (last 3)
      setRecentJobs(jobs.slice(0, 3));

      // Set recent applications (last 3)
      setRecentApplications(allApplications.slice(0, 3));

      // Generate chart data from jobs by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const chartDataMap = {};
      months.forEach(m => { chartDataMap[m] = { jobs: 0, hires: 0 }; });

      jobs.forEach(job => {
        const date = new Date(job.createdAt);
        const month = months[date.getMonth()];
        if (chartDataMap[month]) {
          chartDataMap[month].jobs += 1;
          if (job.hiredFreelancer) {
            chartDataMap[month].hires += 1;
          }
        }
      });

      setChartData(months.map(m => ({
        month: m,
        jobs: chartDataMap[m]?.jobs || 0,
        hires: chartDataMap[m]?.hires || 0
      })));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
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
            {stats.activeJobs} active jobs
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
              <p className="text-sm text-dark-500">Hired</p>
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
              <p className="text-sm text-dark-500">Rating</p>
              <p className="text-3xl font-bold text-dark-900 mt-1">{stats.averageRating}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-500">
              <FaStar className="text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Average client rating
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
              name="Jobs Posted"
            />
            <Line 
              type="monotone" 
              dataKey="hires" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e' }}
              name="Hires"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-dark-900">Recent Jobs</h3>
          <Link to="/client/my-jobs" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>
        {recentJobs.length > 0 ? (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium text-dark-900">{job.title}</div>
                  <div className="text-sm text-dark-500">{job.category} • {job.applications?.length || 0} applications</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  job.status === 'active' || job.status === 'published' ? 'bg-green-100 text-green-700' :
                  job.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-dark-500 text-center py-4">No jobs posted yet</p>
        )}
      </motion.div>
    </div>
  );
};

export default ClientDashboard;