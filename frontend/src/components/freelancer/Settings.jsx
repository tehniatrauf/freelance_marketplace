// src/components/freelancer/Settings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, 
  FaBell, 
  FaLock, 
  FaUser, 
  FaPalette,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMoon,
  FaSun,
  FaClock,
  FaDollarSign,
  FaLanguage
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const FreelancerSettings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      jobMatches: true,
      applicationUpdates: true,
      projectUpdates: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: true,
      showRate: true,
      showAvailability: true,
    },
    preferences: {
      language: 'English',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light',
      currency: 'USD',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordChanged: '2024-02-15',
    },
    availability: {
      status: 'available',
      weeklyHours: 40,
      preferredProjects: ['Web Development', 'Mobile Development'],
      noticePeriod: 'Immediate',
    }
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Settings</h1>
        <p className="text-dark-600 mb-8">Manage your account preferences and settings</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaBell className="text-blue-500 text-xl" />
              <h2 className="text-xl font-semibold text-dark-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-dark-900">Email Notifications</div>
                  <div className="text-sm text-dark-500">Receive notifications via email</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleChange('notifications', 'email', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-dark-900">Push Notifications</div>
                  <div className="text-sm text-dark-500">Receive push notifications in browser</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => handleChange('notifications', 'push', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-dark-900">Job Matches</div>
                  <div className="text-sm text-dark-500">Get notified about matching jobs</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.jobMatches}
                    onChange={(e) => handleChange('notifications', 'jobMatches', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-green-500 text-xl" />
              <h2 className="text-xl font-semibold text-dark-900">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleChange('privacy', 'profileVisibility', e.target.value)}
                  className="input-primary"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">Connections Only</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-dark-900">Show Email</div>
                  <div className="text-sm text-dark-500">Display email on your profile</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => handleChange('privacy', 'showEmail', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-dark-900">Show Rate</div>
                  <div className="text-sm text-dark-500">Display your hourly rate on profile</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showRate}
                    onChange={(e) => handleChange('privacy', 'showRate', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaGlobe className="text-purple-500 text-xl" />
              <h2 className="text-xl font-semibold text-dark-900">Preferences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleChange('preferences', 'language', e.target.value)}
                  className="input-primary"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handleChange('preferences', 'timezone', e.target.value)}
                  className="input-primary"
                >
                  <option value="UTC-5">UTC-5</option>
                  <option value="UTC-6">UTC-6</option>
                  <option value="UTC-7">UTC-7</option>
                  <option value="UTC-8">UTC-8</option>
                  <option value="UTC+0">UTC+0</option>
                  <option value="UTC+1">UTC+1</option>
                  <option value="UTC+2">UTC+2</option>
                  <option value="UTC+3">UTC+3</option>
                  <option value="UTC+4">UTC+4</option>
                  <option value="UTC+5">UTC+5</option>
                  <option value="UTC+5:30">UTC+5:30</option>
                  <option value="UTC+8">UTC+8</option>
                  <option value="UTC+10">UTC+10</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Date Format
                </label>
                <select
                  value={settings.preferences.dateFormat}
                  onChange={(e) => handleChange('preferences', 'dateFormat', e.target.value)}
                  className="input-primary"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Currency
                </label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => handleChange('preferences', 'currency', e.target.value)}
                  className="input-primary"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Theme
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange('preferences', 'theme', 'light')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                      settings.preferences.theme === 'light'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <FaSun className="text-yellow-500" />
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('preferences', 'theme', 'dark')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                      settings.preferences.theme === 'dark'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <FaMoon className="text-dark-600" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaClock className="text-orange-500 text-xl" />
              <h2 className="text-xl font-semibold text-dark-900">Availability</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Status
                </label>
                <select
                  value={settings.availability.status}
                  onChange={(e) => handleChange('availability', 'status', e.target.value)}
                  className="input-primary"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Weekly Hours Available
                </label>
                <input
                  type="number"
                  value={settings.availability.weeklyHours}
                  onChange={(e) => handleChange('availability', 'weeklyHours', parseInt(e.target.value))}
                  className="input-primary"
                  min="0"
                  max="168"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Notice Period
                </label>
                <select
                  value={settings.availability.noticePeriod}
                  onChange={(e) => handleChange('availability', 'noticePeriod', e.target.value)}
                  className="input-primary"
                >
                  <option value="Immediate">Immediate</option>
                  <option value="1 day">1 day</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaLock className="text-red-500 text-xl" />
              <h2 className="text-xl font-semibold text-dark-900">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-dark-900">Two-Factor Authentication</div>
                  <div className="text-sm text-dark-500">Add an extra layer of security</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                  className="input-primary max-w-xs"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaLock className="text-red-500 text-xl" />
              <h2 className="text-xl font-semibold text-dark-900">Change Password</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-primary"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-primary"
                  placeholder="Enter new password (min 8 characters)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-primary"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="button"
                onClick={handlePasswordChange}
                className="btn-primary"
              >
                Change Password
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary flex items-center gap-2 w-full justify-center py-3">
            <FaSave />
            Save All Settings
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FreelancerSettings;