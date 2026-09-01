// frontend/src/components/client/Profile.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaCamera,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaUser
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const ClientProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/profile');
      const userData = response.data.user;
      
      // Set default values if fields are empty
      setProfile({
        id: userData.id,
        name: userData.name || user?.name || 'User',
        email: userData.email || user?.email || '',
        companyName: userData.companyName || '',
        companyDescription: userData.companyDescription || '',
        industry: userData.industry || '',
        website: userData.website || '',
        phone: userData.phone || '',
        location: userData.location || '',
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${userData.name || user?.name || 'User'}&background=3b82f6&color=fff&size=128`,
        rating: userData.rating || 0,
        totalJobsPosted: userData.totalJobsPosted || 0,
        totalJobsCompleted: userData.totalJobsCompleted || 0,
        isVerified: userData.isVerified || false,
        createdAt: userData.createdAt || new Date().toISOString()
      });
      
      setFormData({
        name: userData.name || user?.name || 'User',
        companyName: userData.companyName || '',
        companyDescription: userData.companyDescription || '',
        industry: userData.industry || '',
        website: userData.website || '',
        phone: userData.phone || '',
        location: userData.location || ''
      });
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Set default profile if API fails
      setProfile({
        name: user?.name || 'User',
        email: user?.email || '',
        avatar: `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=3b82f6&color=fff&size=128`,
        companyName: '',
        companyDescription: '',
        industry: '',
        website: '',
        phone: '',
        location: '',
        rating: 0,
        totalJobsPosted: 0,
        totalJobsCompleted: 0,
        isVerified: false,
        createdAt: new Date().toISOString()
      });
      setFormData({
        name: user?.name || 'User',
        companyName: '',
        companyDescription: '',
        industry: '',
        website: '',
        phone: '',
        location: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updateData = {
        name: formData.name,
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        industry: formData.industry,
        website: formData.website,
        phone: formData.phone,
        location: formData.location
      };

      await api.put('/users/profile', updateData);
      setProfile(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile || !profile.name) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-4xl text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-dark-900">Complete Your Profile</h2>
          <p className="text-dark-600 mt-2">Add your information to help clients find you</p>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary mt-4 flex items-center gap-2 mx-auto"
          >
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
    );
  }

  // Edit Mode
  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-dark-900">Edit Profile</h1>
            <button onClick={() => setIsEditing(false)} className="text-dark-500 hover:text-dark-700">
              <FaTimes className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                  <label className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer shadow-lg">
                    <FaCamera className="text-sm" />
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                <div className="flex-1">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-primary text-xl font-semibold" placeholder="Your Name" />
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="input-primary mt-2" placeholder="Company Name" />
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <textarea name="companyDescription" value={formData.companyDescription} onChange={handleChange} rows={4} className="input-primary" placeholder="Company Description" />
                <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="input-primary" placeholder="Industry" />
                <input type="url" name="website" value={formData.website} onChange={handleChange} className="input-primary" placeholder="Website URL" />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-dark-400" />
                  <input type="email" value={profile.email} className="input-primary flex-1" disabled />
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-dark-400" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-primary flex-1" placeholder="Phone Number" />
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-dark-400" />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className="input-primary flex-1" placeholder="Location" />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary flex items-center gap-2 flex-1 py-3"><FaSave /> Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50">Cancel</button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // View Mode - Shows profile with Edit button
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dark-900">My Profile</h1>
          <button onClick={() => setIsEditing(true)} className="btn-primary flex items-center gap-2">
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center gap-6">
            <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-dark-900">{profile.name}</h2>
                {profile.isVerified && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Verified</span>
                )}
              </div>
              <p className="text-lg text-dark-600">{profile.companyName || 'No company'}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /><span className="font-medium">{profile.rating || 0}</span></span>
                <span className="text-dark-400">•</span>
                <span className="text-dark-600">{profile.totalJobsPosted || 0} jobs posted</span>
                <span className="text-dark-400">•</span>
                <span className="text-dark-600">{profile.totalJobsCompleted || 0} completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Company Info</h3>
            <div className="space-y-3 text-dark-600">
              <div className="flex items-start gap-3">
                <FaBuilding className="text-dark-400 mt-1" />
                <div>
                  <p className="font-medium text-dark-900">{profile.companyName || 'Not specified'}</p>
                  <p className="text-sm">{profile.industry || 'No industry'}</p>
                </div>
              </div>
              {profile.location && (
                <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-dark-400" /><span>{profile.location}</span></div>
              )}
              {profile.website && (
                <div className="flex items-center gap-3"><FaGlobe className="text-dark-400" /><a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profile.website}</a></div>
              )}
              <div className="flex items-center gap-3"><FaClock className="text-dark-400" /><span>Member since {new Date(profile.createdAt).toLocaleDateString()}</span></div>
            </div>
            <p className="mt-4 text-dark-600 leading-relaxed">{profile.companyDescription || 'No company description'}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><FaEnvelope className="text-dark-400" /><span>{profile.email}</span></div>
              <div className="flex items-center gap-3"><FaPhone className="text-dark-400" /><span>{profile.phone || 'No phone'}</span></div>
            </div>

            <h3 className="text-lg font-semibold text-dark-900 mt-6 mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-blue-600">{profile.totalJobsPosted || 0}</p><p className="text-sm text-dark-500">Jobs Posted</p></div>
              <div className="bg-green-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-green-600">{profile.totalJobsCompleted || 0}</p><p className="text-sm text-dark-500">Completed</p></div>
              <div className="bg-yellow-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-yellow-600">{profile.rating || 0}</p><p className="text-sm text-dark-500">Rating</p></div>
              <div className="bg-purple-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-purple-600">{(profile.totalJobsPosted || 0) - (profile.totalJobsCompleted || 0)}</p><p className="text-sm text-dark-500">Active Jobs</p></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientProfile;