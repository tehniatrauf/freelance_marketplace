// frontend/src/components/client/PostJob.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaPlus, FaTimes, FaSave, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    experienceLevel: '',
    projectType: 'fixed',
    budget: '',
    deadline: '',
    freelancersNeeded: 1,
    location: '',
    isRemote: true,
    attachments: [],
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design & Creative',
    'Writing & Translation',
    'Video & Animation',
    'Digital Marketing',
    'Data Science',
    'AI & Machine Learning',
    'DevOps & Cloud',
    'Blockchain & Crypto',
    'Customer Support',
    'Sales & Marketing',
  ];

  const experienceLevels = ['Entry', 'Intermediate', 'Expert'];
  const projectTypes = ['Fixed Price', 'Hourly'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setScreeningQuestions([...screeningQuestions, currentQuestion.trim()]);
      setCurrentQuestion('');
    }
  };

  const handleRemoveQuestion = (question) => {
    setScreeningQuestions(screeningQuestions.filter(q => q !== question));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleRemoveFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.budget) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: skills,
        budget: formData.budget,
        projectType: formData.projectType,
        experienceLevel: formData.experienceLevel,
        deadline: formData.deadline,
        isRemote: formData.isRemote,
        location: formData.location || 'Remote',
        freelancersNeeded: parseInt(formData.freelancersNeeded) || 1,
        status: 'published',
        screeningQuestions: screeningQuestions
      };

      await api.post('/jobs', jobData);
      
      toast.success('Job posted successfully! 🎉');
      navigate('/client/my-jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error(error.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dark-600 hover:text-dark-900 transition-colors mb-4"
          >
            <FaArrowLeft />
            Back
          </button>
          <h1 className="text-3xl font-bold text-dark-900">Post a New Job</h1>
          <p className="text-dark-600 mt-2">
            Fill in the details below to create a job listing and attract the best freelancers.
          </p>
        </div>

        {/* Form - Same as before but with API integration */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-dark-900 mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Build a Responsive E-Commerce Website"
                  className="input-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe your project in detail..."
                  className="input-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-primary"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Experience Level *
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="input-primary"
                    required
                  >
                    <option value="">Select Experience</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Skills Required *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="Add a skill (e.g., PHP)"
                    className="input-primary flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-dark-900 mb-6">Budget & Timeline</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="input-primary"
                  >
                    {projectTypes.map(type => (
                      <option key={type} value={type.toLowerCase()}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Budget ({formData.projectType === 'fixed' ? '$' : '$/hr'}) *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder={formData.projectType === 'fixed' ? '500' : '25'}
                    className="input-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="input-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Freelancers Needed
                  </label>
                  <input
                    type="number"
                    name="freelancersNeeded"
                    value={formData.freelancersNeeded}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="input-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Work Type */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-dark-900 mb-6">Location & Work Type</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., New York, USA"
                    className="input-primary"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isRemote"
                      checked={formData.isRemote}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-dark-700">This is a remote position</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Screening Questions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-dark-900 mb-6">Screening Questions</h2>
            
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Add a screening question"
                  className="input-primary flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
                />
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
              {screeningQuestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  {screeningQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <span className="text-dark-700">{question}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(question)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-dark-900 mb-6">Attachments</h2>
            
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <FaUpload className="text-2xl text-blue-500" />
                  </div>
                  <p className="text-dark-700 font-medium">
                    Click to upload files
                  </p>
                  <p className="text-dark-500 text-sm mt-1">
                    PDF, DOC, JPG, PNG (Max 10MB)
                  </p>
                </label>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <span className="text-dark-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                <>
                  <FaSave />
                  Post Job
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 text-dark-600 hover:text-dark-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;