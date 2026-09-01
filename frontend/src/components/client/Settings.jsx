// src/components/client/Settings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaBell, FaLock, FaUser, FaPalette } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ClientSettings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      jobUpdates: true,
      applicationUpdates: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: true,
    },
    preferences: {
      language: 'English',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
    },
  });

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
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
                  <div className="font-medium text-dark-900">SMS Notifications</div>
                  <div className="text-sm text-dark-500">Receive notifications via SMS</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => handleChange('notifications', 'sms', e.target.checked)}
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

          <button type="submit" className="btn-primary flex items-center gap-2">
            <FaSave />
            Save Settings
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ClientSettings;