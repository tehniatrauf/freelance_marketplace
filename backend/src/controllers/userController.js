// backend/src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    // Fields to update
    const allowedFields = [
      'name', 'phone', 'location', 'avatar',
      'companyName', 'companyDescription', 'industry', 'website',
      'title', 'bio', 'skills', 'experience', 'education', 'hourlyRate', 'portfolio'
    ];

    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatar: req.file.filename,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get freelancer profile by ID
// @route   GET /api/users/freelancer/:id
// @access  Public
exports.getFreelancerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name title bio skills experience education hourlyRate portfolio rating totalReviews avatar location');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role !== 'freelancer') {
      return res.status(400).json({
        success: false,
        message: 'User is not a freelancer'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get client profile by ID
// @route   GET /api/users/client/:id
// @access  Public
exports.getClientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name companyName companyDescription industry website rating totalJobsPosted totalJobsCompleted location avatar');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role !== 'client') {
      return res.status(400).json({
        success: false,
        message: 'User is not a client'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all freelancers (with filters)
// @route   GET /api/users/freelancers
// @access  Public
exports.getFreelancers = async (req, res) => {
  try {
    const { 
      skill, 
      minRate, 
      maxRate, 
      location,
      page = 1,
      limit = 10
    } = req.query;

    const filter = { role: 'freelancer', isActive: true };

    if (skill) {
      filter.skills = { $in: [skill] };
    }

    if (minRate || maxRate) {
      filter.hourlyRate = {};
      if (minRate) filter.hourlyRate.$gte = parseInt(minRate);
      if (maxRate) filter.hourlyRate.$lte = parseInt(maxRate);
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const freelancers = await User.find(filter)
      .select('name title bio skills hourlyRate rating totalReviews avatar location')
      .sort({ rating: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      freelancers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all clients
// @route   GET /api/users/clients
// @access  Private (Admin only)
exports.getClients = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const clients = await User.find({ role: 'client' })
      .select('name companyName industry rating totalJobsPosted totalJobsCompleted location avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ role: 'client' });

    res.status(200).json({
      success: true,
      clients,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private (Admin only)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private (Admin only)
exports.updateUser = async (req, res) => {
  try {
    const allowedFields = [
      'name', 'email', 'role', 'phone', 'location', 
      'isActive', 'isVerified', 'companyName', 'title'
    ];

    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete (deactivate) instead of hard delete
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Activate user (Admin only)
// @route   PUT /api/users/:id/activate
// @access  Private (Admin only)
exports.activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User activated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add skill to freelancer
// @route   POST /api/users/skills
// @access  Private (Freelancer only)
exports.addSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a skill'
      });
    }

    const user = await User.findById(req.user.id);

    if (user.role !== 'freelancer') {
      return res.status(403).json({
        success: false,
        message: 'Only freelancers can add skills'
      });
    }

    if (!user.skills.includes(skill)) {
      user.skills.push(skill);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Skill added successfully',
      skills: user.skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove skill from freelancer
// @route   DELETE /api/users/skills/:skill
// @access  Private (Freelancer only)
exports.removeSkill = async (req, res) => {
  try {
    const { skill } = req.params;

    const user = await User.findById(req.user.id);

    if (user.role !== 'freelancer') {
      return res.status(403).json({
        success: false,
        message: 'Only freelancers can remove skills'
      });
    }

    user.skills = user.skills.filter(s => s !== skill);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Skill removed successfully',
      skills: user.skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add portfolio item
// @route   POST /api/users/portfolio
// @access  Private (Freelancer only)
exports.addPortfolioItem = async (req, res) => {
  try {
    const { title, description, image, link, github, technologies } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title'
      });
    }

    const user = await User.findById(req.user.id);

    if (user.role !== 'freelancer') {
      return res.status(403).json({
        success: false,
        message: 'Only freelancers can add portfolio items'
      });
    }

    user.portfolio.push({
      title,
      description,
      image,
      link,
      github,
      technologies: technologies || []
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio item added successfully',
      portfolio: user.portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove portfolio item
// @route   DELETE /api/users/portfolio/:itemId
// @access  Private (Freelancer only)
exports.removePortfolioItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user.id);

    if (user.role !== 'freelancer') {
      return res.status(403).json({
        success: false,
        message: 'Only freelancers can remove portfolio items'
      });
    }

    user.portfolio = user.portfolio.filter(item => item._id.toString() !== itemId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Portfolio item removed successfully',
      portfolio: user.portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user stats (for dashboard)
// @route   GET /api/users/stats
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let stats = {
      totalJobs: 0,
      activeJobs: 0,
      completedJobs: 0,
      totalApplications: 0,
      shortlisted: 0,
      rating: user.rating || 0,
      totalReviews: user.totalReviews || 0
    };

    if (user.role === 'client') {
      // Get job stats for client
      const Job = require('../models/Job');
      const jobs = await Job.find({ client: user.id });
      
      stats.totalJobs = jobs.length;
      stats.activeJobs = jobs.filter(j => j.status === 'active').length;
      stats.completedJobs = jobs.filter(j => j.status === 'completed').length;
      stats.totalJobsPosted = user.totalJobsPosted || 0;
      stats.totalJobsCompleted = user.totalJobsCompleted || 0;

    } else if (user.role === 'freelancer') {
      // Get application stats for freelancer
      const Application = require('../models/Application');
      const applications = await Application.find({ freelancer: user.id });
      
      stats.totalApplications = applications.length;
      stats.shortlisted = applications.filter(a => a.status === 'shortlisted').length;
      stats.totalJobsCompleted = user.totalJobsCompleted || 0;
      stats.totalEarnings = 0; // Will be calculated from completed projects
    }

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};