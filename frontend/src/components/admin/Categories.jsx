// src/components/admin/Categories.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCheck,
  FaTimes,
  FaFolder,
  FaFolderOpen,
  FaArrowUp,
  FaArrowDown,
  FaSave
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '#3B82F6',
    status: 'active'
  });

  const [categories] = useState([
    {
      id: 1,
      name: 'Web Development',
      description: 'Web development and programming services',
      icon: '🌐',
      color: '#3B82F6',
      status: 'active',
      jobCount: 120,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Mobile Development',
      description: 'Mobile app development for iOS and Android',
      icon: '📱',
      color: '#22C55E',
      status: 'active',
      jobCount: 80,
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'Design & Creative',
      description: 'Graphic design, UI/UX, and creative services',
      icon: '🎨',
      color: '#8B5CF6',
      status: 'active',
      jobCount: 60,
      createdAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Writing & Translation',
      description: 'Content writing, editing, and translation services',
      icon: '✍️',
      color: '#F59E0B',
      status: 'inactive',
      jobCount: 40,
      createdAt: '2024-01-20'
    },
    {
      id: 5,
      name: 'Video & Animation',
      description: 'Video production, editing, and animation',
      icon: '🎬',
      color: '#EF4444',
      status: 'active',
      jobCount: 25,
      createdAt: '2024-02-01'
    },
    {
      id: 6,
      name: 'Digital Marketing',
      description: 'SEO, social media, and digital marketing services',
      icon: '📊',
      color: '#EC4899',
      status: 'active',
      jobCount: 35,
      createdAt: '2024-02-10'
    }
  ]);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
        status: category.status
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        icon: '',
        color: '#3B82F6',
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('Category name is required');
      return;
    }

    if (editingCategory) {
      toast.success('Category updated successfully!');
    } else {
      toast.success('Category created successfully!');
    }
    handleCloseModal();
  };

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      toast.success(`Category "${category.name}" deleted successfully!`);
    }
  };

  const handleToggleStatus = (category) => {
    const newStatus = category.status === 'active' ? 'inactive' : 'active';
    toast.success(`Category "${category.name}" ${newStatus === 'active' ? 'activated' : 'deactivated'}!`);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colorOptions = [
    '#3B82F6', '#22C55E', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899',
    '#14B8A6', '#F97316', '#6366F1', '#06B6D4', '#8B5CF6', '#D946EF'
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Categories</h1>
            <p className="text-dark-600 mt-2">
              Manage job categories and their settings
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Add Category
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-primary pl-12"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon || <FaFolder className="text-dark-400" />}
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900">{category.name}</h3>
                  <p className="text-sm text-dark-500">{category.jobCount} jobs</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                category.status === 'active' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
              </span>
            </div>

            <p className="mt-3 text-dark-600 text-sm line-clamp-2">
              {category.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-dark-400">
              <span>Created: {category.createdAt}</span>
              <span>•</span>
              <span>Color: <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></span></span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleOpenModal(category)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleToggleStatus(category)}
                className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 text-dark-600 rounded-xl hover:bg-gray-100 transition-colors text-sm"
              >
                {category.status === 'active' ? <FaTimes /> : <FaCheck />}
                {category.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleDelete(category)}
                className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <p className="text-dark-500">
                {editingCategory ? 'Update category details' : 'Create a new job category'}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="e.g., Web Development"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="input-primary"
                  placeholder="Describe this category..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="e.g., 🌐"
                  maxLength="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full transition-all ${
                        formData.color === color 
                          ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' 
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-8 h-8 rounded-full cursor-pointer border-0 p-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <FaSave />
                  {editingCategory ? 'Update Category' : 'Create Category'}
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

export default AdminCategories;