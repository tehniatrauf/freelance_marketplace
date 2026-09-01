// frontend/src/components/freelancer/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaLink, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../../api/axiosConfig';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    github: '',
    technologies: ''
  });

  // Fetch portfolio from API
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await api.get('/portfolio');
      setPortfolioItems(response.data.portfolio || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description || '',
        image: item.image || '',
        link: item.link || '',
        github: item.github || '',
        technologies: item.technologies ? item.technologies.join(', ') : ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
        github: '',
        technologies: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const portfolioData = {
        title: formData.title,
        description: formData.description,
        image: formData.image || 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Project',
        link: formData.link,
        github: formData.github,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingItem) {
        await api.put(`/portfolio/${editingItem.id}`, portfolioData);
        toast.success('Portfolio updated successfully!');
      } else {
        await api.post('/portfolio', portfolioData);
        toast.success('Portfolio item added successfully!');
      }
      
      handleCloseModal();
      fetchPortfolio(); // Refresh the list
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error('Failed to save portfolio item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await api.delete(`/portfolio/${id}`);
        toast.success('Portfolio item deleted!');
        fetchPortfolio();
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        toast.error('Failed to delete portfolio item');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dark-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Portfolio</h1>
            <p className="text-dark-600 mt-2">
              Showcase your best work to attract clients
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Add Project
          </button>
        </div>
      </motion.div>

      {portfolioItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FaLink className="text-3xl text-dark-400" />
          </div>
          <h3 className="text-xl font-semibold text-dark-900 mb-2">No portfolio items yet</h3>
          <p className="text-dark-500">
            Add your projects to showcase your skills and attract clients.
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 btn-primary"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Project'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                  >
                    <FaEdit className="text-dark-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-dark-900">{item.title}</h3>
                <p className="text-dark-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(item.technologies || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-dark-600 hover:text-dark-800 transition-colors"
                    >
                      <FaGithub />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal - same as before */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="input-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://example.com/project"
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Technologies Used
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB (comma separated)"
                  className="input-primary"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingItem ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;