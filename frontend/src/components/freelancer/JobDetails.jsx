// src/components/freelancer/JobDetails.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaBriefcase,
  FaUsers,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaCheckCircle,
  FaFileAlt,
  FaUserTie
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const FreelancerJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Mock job data
    const mockJob = {
      id: parseInt(id),
      title: 'Build E-Commerce Website',
      client: {
        name: 'ABC Company',
        rating: 4.6,
        location: 'New York, USA',
        avatar: 'https://ui-avatars.com/api/?name=ABC+Company&background=3b82f6&color=fff',
        totalJobs: 87,
        totalHires: 45,
        memberSince: '2023-01-15',
        about: 'ABC Company is a leading e-commerce solutions provider with 10 years of experience.',
      },
      description: 'We need a developer to create a fully functional e-commerce website with payment integration, user authentication, and admin dashboard. The site should be responsive and optimized for performance.',
      category: 'Web Development',
      skills: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Laravel'],
      budget: '$400 - $600',
      projectType: 'Fixed Price',
      deadline: '20 Days',
      experienceLevel: 'Intermediate',
      isRemote: true,
      location: 'Remote',
      postedAt: '2024-03-01',
      applications: 15,
      attachments: ['requirements.pdf', 'design.fig'],
      screeningQuestions: [
        'What is your experience with e-commerce platforms?',
        'How would you handle payment integration?',
        'What security measures would you implement?'
      ]
    };
    setJob(mockJob);
    setLoading(false);
  }, [id]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved jobs' : 'Job saved successfully!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-dark-600 hover:text-dark-900 transition-colors mb-4"
        >
          <FaArrowLeft />
          Back to Jobs
        </button>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-dark-900">{job.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={job.client.avatar}
                    alt={job.client.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-dark-700">{job.client.name}</span>
                </div>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  {job.client.rating}
                </span>
                <span className="text-dark-400">•</span>
                <span className="text-dark-500">Posted: {job.postedAt}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isSaved ? (
                  <FaBookmark className="text-blue-500 text-xl" />
                ) : (
                  <FaRegBookmark className="text-dark-400 text-xl" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaShare className="text-dark-400 text-xl" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 py-4 border-y border-gray-100">
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-green-500" />
              <span className="font-semibold text-dark-900">{job.budget}</span>
              <span className="text-dark-500 text-sm">({job.projectType})</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500" />
              <span className="text-dark-700">{job.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" />
              <span className="text-dark-700">{job.isRemote ? 'Remote' : job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-purple-500" />
              <span className="text-dark-700">{job.experienceLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-orange-500" />
              <span className="text-dark-700">{job.applications} applications</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-dark-900 mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-dark-900 mb-4">Job Description</h3>
          <p className="text-dark-600 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-dark-900 mb-4">About the Client</h3>
          <div className="flex items-start gap-4">
            <img
              src={job.client.avatar}
              alt={job.client.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="font-semibold text-dark-900">{job.client.name}</div>
              <div className="flex items-center gap-4 text-sm text-dark-500">
                <span>⭐ {job.client.rating}</span>
                <span>•</span>
                <span>{job.client.totalJobs} jobs posted</span>
                <span>•</span>
                <span>{job.client.totalHires} hires</span>
              </div>
              <p className="mt-2 text-dark-600">{job.client.about}</p>
            </div>
          </div>
        </div>

        {job.screeningQuestions && job.screeningQuestions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Screening Questions</h3>
            <ul className="space-y-3">
              {job.screeningQuestions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-dark-600">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.attachments && job.attachments.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Attachments</h3>
            <div className="flex flex-wrap gap-3">
              {job.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl"
                >
                  <FaFileAlt className="text-blue-500" />
                  <span className="text-dark-700">{file}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Link
            to={`/freelancer/apply/${job.id}`}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-lg"
          >
            <FaCheckCircle />
            Apply Now
          </Link>
          <Link
            to={`/client/${job.client.id}`}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-dark-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FaUserTie />
            View Client
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FreelancerJobDetails;