// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ClientLayout from './components/layout/ClientLayout';
import FreelancerLayout from './components/layout/FreelancerLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RoleSelection from './components/auth/RoleSelection';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import BrowseJobs from './pages/BrowseJobs';
import BrowseFreelancers from './pages/BrowseFreelancers';
import Contact from './pages/Contact';

// Client Pages
import ClientDashboard from './components/client/Dashboard';
import PostJob from './components/client/PostJob';
import MyJobs from './components/client/MyJobs';
import ClientJobDetails from './components/client/JobDetails';
import Applications from './components/client/Applications';
import Shortlisted from './components/client/Shortlisted';
import ClientProjects from './components/client/Projects';
import ClientProfile from './components/client/Profile';
import ClientSettings from './components/client/Settings';

// Freelancer Pages
import FreelancerDashboard from './components/freelancer/Dashboard';
import FindJobs from './components/freelancer/FindJobs';
import FreelancerJobDetails from './components/freelancer/JobDetails';
import ApplyJob from './components/freelancer/ApplyJob';
import MyApplications from './components/freelancer/MyApplications';
import FreelancerProjects from './components/freelancer/Projects';
import FreelancerProfile from './components/freelancer/Profile';
import Portfolio from './components/freelancer/Portfolio';
import FreelancerSettings from './components/freelancer/Settings';

// Messaging
import Messages from './components/messaging/Messages';

// Admin Pages
import AdminDashboard from './components/admin/Dashboard';
import AdminUsers from './components/admin/Users';
import AdminJobs from './components/admin/Jobs';
import AdminReports from './components/admin/Reports';
import AdminCategories from './components/admin/Categories';

// Styles
import './styles/globals.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/browse-jobs" element={<BrowseJobs />} />
                  <Route path="/browse-freelancers" element={<BrowseFreelancers />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/role-selection" element={<RoleSelection />} />
                  
                  {/* Client Routes */}
                  <Route path="/client" element={<ProtectedRoute role="client" />}>
                    <Route element={<ClientLayout />}>
                      <Route path="dashboard" element={<ClientDashboard />} />
                      <Route path="post-job" element={<PostJob />} />
                      <Route path="my-jobs" element={<MyJobs />} />
                      <Route path="job/:id" element={<ClientJobDetails />} />
                      <Route path="applications" element={<Applications />} />
                      <Route path="shortlisted" element={<Shortlisted />} />
                      <Route path="projects" element={<ClientProjects />} />
                      <Route path="profile" element={<ClientProfile />} />
                      <Route path="settings" element={<ClientSettings />} />
                      <Route path="messages" element={<Messages />} />
                    </Route>
                  </Route>
                  
                  {/* Freelancer Routes */}
                  <Route path="/freelancer" element={<ProtectedRoute role="freelancer" />}>
                    <Route element={<FreelancerLayout />}>
                      <Route path="dashboard" element={<FreelancerDashboard />} />
                      <Route path="find-jobs" element={<FindJobs />} />
                      <Route path="job/:id" element={<FreelancerJobDetails />} />
                      <Route path="apply/:id" element={<ApplyJob />} />
                      <Route path="my-applications" element={<MyApplications />} />
                      <Route path="projects" element={<FreelancerProjects />} />
                      <Route path="profile" element={<FreelancerProfile />} />
                      <Route path="portfolio" element={<Portfolio />} />
                      <Route path="settings" element={<FreelancerSettings />} />
                      <Route path="messages" element={<Messages />} />
                    </Route>
                  </Route>
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<ProtectedRoute role="admin" />}>
                    <Route element={<AdminLayout />}>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="jobs" element={<AdminJobs />} />
                      <Route path="reports" element={<AdminReports />} />
                      <Route path="categories" element={<AdminCategories />} />
                    </Route>
                  </Route>
                  
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
              <Footer />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#ffffff',
                    color: '#0f172a',
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    padding: '16px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;