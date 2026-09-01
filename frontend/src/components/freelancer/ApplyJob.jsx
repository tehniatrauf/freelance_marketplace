// src/components/freelancer/ApplyJob.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaUpload,
  FaFileAlt,
  FaTimes,
  FaCheck,
  FaStar
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedBudget: '',
    estimatedDelivery: '',
    relevantExperience: '',
    portfolioItems: [],
    additionalNotes: ''
  });
  const [files, setFiles] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([
    { title: '', link: '' }
  ]);

  // Fetch job details
  useEffect(() => {
    // Mock job data
    const mockJob = {
      id: parseInt(id),
      title: 'Build E-Commerce Website',
      client: 'ABC Company',
      clientRating: 4.6,
      description: 'We need a developer to create a fully functional e-commerce website with payment integration, user authentication, and admin dashboard.',
      budget: '$400 - $600',
      deadline: '20 Days',
      skills: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      experience: 'Intermediate',
      category: 'Web Development',
      applications: 15
    };
    setJob(mockJob);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePortfolioChange = (index, field, value) => {
    const updated = [...portfolioItems];
    updated[index][field] = value;
    setPortfolioItems(updated);
  };

  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, { title: '', link: '' }]);
  };

  const removePortfolioItem = (index) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.coverLetter) {
      toast.error('Please write a cover letter');
      return;
    }

    if (!formData.proposedBudget) {
      toast.error('Please enter your proposed budget');
      return;
    }

    if (!formData.estimatedDelivery) {
      toast.error('Please enter estimated delivery time');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Application submitted successfully! 🎉');
      navigate('/freelancer/my-applications');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-dark-600 hover:text-dark-900 transition-colors mb-4"
        >
          <FaArrowLeft />
          Back to Job
        </button>

        {/* Job Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <h2 className="text-2xl font-bold text-dark-900">{job.title}</h2>
          <div className="flex items-center gap-4 mt-2 text-dark-600">
            <span>{job.client}</span>
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              {job.clientRating}
            </span>
            <span>•</span>
            <span>Budget: {job.budget}</span>
            <span>•</span>
            <span>Deadline: {job.deadline}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4">Cover Letter *</h3>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={6}
              placeholder="Introduce yourself, explain why you're the perfect fit for this job, and highlight your relevant experience..."
              className="input-primary"
              required
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4">Your Proposal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Proposed Budget ($) *
                </label>
                <input
                  type="number"
                  name="proposedBudget"
                  value={formData.proposedBudget}
                  onChange={handleChange}
                  placeholder="350"
                  className="input-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Estimated Delivery *
                </label>
                <input
                  type="text"
                  name="estimatedDelivery"
                  value={formData.estimatedDelivery}
                  onChange={handleChange}
                  placeholder="18 Days"
                  className="input-primary"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Relevant Experience
              </label>
              <textarea
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your relevant experience for this specific project..."
                className="input-primary"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4">Portfolio</h3>
            
            {portfolioItems.map((item, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={item.title}
                  onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                  className="input-primary flex-1"
                />
                <input
                  type="url"
                  placeholder="Project Link"
                  value={item.link}
                  onChange={(e) => handlePortfolioChange(index, 'link', e.target.value)}
                  className="input-primary flex-1"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removePortfolioItem(index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPortfolioItem}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              + Add Portfolio Item
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4">Attachments</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
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
                  Resume, portfolio samples, or other relevant documents
                </p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <FaFileAlt className="text-blue-500" />
                      <span className="text-dark-700">{file.name}</span>
                      <span className="text-sm text-dark-400">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-dark-900 mb-4">Additional Notes</h3>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional information you'd like the client to know..."
              className="input-primary"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting Application...
                </>
              ) : (
                <>
                  <FaCheck />
                  Submit Application
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

export default ApplyJob;