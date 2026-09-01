// frontend/src/components/freelancer/Profile.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaClock,
  FaDollarSign,
  FaLink,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCamera,
  FaUser,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const FreelancerProfile = () => {
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
      
      setProfile(userData);
      setFormData(userData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
      // Set default empty profile
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        title: '',
        bio: '',
        location: '',
        phone: '',
        hourlyRate: 0,
        skills: [],
        experience: [],
        education: [],
        rating: 0,
        totalJobsCompleted: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [name]: array }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updateData = {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        location: formData.location,
        phone: formData.phone,
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        skills: formData.skills || []
      };

      await api.put('/users/profile', updateData);
      setProfile(formData);
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

  // Show edit form
  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-dark-900">Edit Profile</h1>
            <button 
              onClick={() => setIsEditing(false)} 
              className="text-dark-500 hover:text-dark-700 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.name || 'User'}`}
                    alt={profile?.name || 'User'}
                    className="w-24 h-24 rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    <FaCamera className="text-sm" />
                  </button>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                    className="input-primary text-xl font-semibold"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    name="title"
                    value={formData?.title || ''}
                    onChange={handleChange}
                    className="input-primary mt-2"
                    placeholder="Professional Title (e.g., Full Stack Developer)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">About You</h3>
              <textarea
                name="bio"
                value={formData?.bio || ''}
                onChange={handleChange}
                rows={4}
                className="input-primary"
                placeholder="Tell clients about yourself, your experience, and what you specialize in..."
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">Contact & Location</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-dark-400" />
                  <input
                    type="email"
                    value={profile?.email || ''}
                    className="input-primary flex-1"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-dark-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData?.phone || ''}
                    onChange={handleChange}
                    className="input-primary flex-1"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-dark-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData?.location || ''}
                    onChange={handleChange}
                    className="input-primary flex-1"
                    placeholder="Location (e.g., New York, USA)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">Skills & Rate</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="skills"
                  value={formData?.skills ? formData.skills.join(', ') : ''}
                  onChange={handleArrayChange}
                  className="input-primary"
                  placeholder="Skills (comma separated: React, Node.js, Python...)"
                />
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-dark-400" />
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData?.hourlyRate || 0}
                    onChange={handleChange}
                    className="input-primary flex-1"
                    placeholder="Hourly Rate (e.g., 35)"
                  />
                  <span className="text-dark-500 text-sm">/ hour</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary flex items-center gap-2 flex-1 py-3">
                <FaSave /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Show profile view with Edit button
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dark-900">My Profile</h1>
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn-primary flex items-center gap-2"
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center gap-6">
            <img
              src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.name || 'User'}`}
              alt={profile?.name || 'User'}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-dark-900">{profile?.name || 'No name set'}</h2>
              <p className="text-lg text-dark-600">{profile?.title || 'Freelancer'}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">{profile?.rating || 0}</span>
                </span>
                <span className="text-dark-400">•</span>
                <span className="text-dark-600">{profile?.totalJobsCompleted || 0} projects</span>
                <span className="text-dark-400">•</span>
                <span className="text-dark-600">${profile?.hourlyRate || 0}/hr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">About</h3>
            <div className="space-y-3 text-dark-600">
              {profile?.location && (
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-dark-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-3">
                  <FaPhone className="text-dark-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-dark-400" />
                <span>{profile?.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-dark-400" />
                <span>Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            <p className="mt-4 text-dark-600 leading-relaxed">{profile?.bio || 'No bio added yet. Click "Edit Profile" to add one.'}</p>
            
            <h3 className="text-lg font-semibold text-dark-900 mt-6 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(profile?.skills && profile.skills.length > 0) ? (
                profile.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-dark-500 text-sm">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Experience</h3>
            {(profile?.experience && profile.experience.length > 0) ? (
              profile.experience.map((exp, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0 py-4">
                  <h4 className="font-semibold text-dark-900">{exp.title}</h4>
                  <p className="text-dark-600">{exp.company}</p>
                  <p className="text-sm text-dark-500">{exp.period}</p>
                </div>
              ))
            ) : (
              <p className="text-dark-500">No experience added yet</p>
            )}

            <h3 className="text-lg font-semibold text-dark-900 mt-6 mb-4">Education</h3>
            {(profile?.education && profile.education.length > 0) ? (
              profile.education.map((edu, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0 py-4">
                  <h4 className="font-semibold text-dark-900">{edu.degree}</h4>
                  <p className="text-dark-600">{edu.institution}</p>
                  <p className="text-sm text-dark-500">{edu.year}</p>
                </div>
              ))
            ) : (
              <p className="text-dark-500">No education added yet</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FreelancerProfile;