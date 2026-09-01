// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    );
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
});

// @desc    Get freelancer profile
// @route   GET /api/users/freelancer/:id
// @access  Public
router.get('/freelancer/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name title bio skills experience education hourlyRate portfolio rating totalReviews avatar location');
    
    if (!user || user.role !== 'freelancer') {
      return res.status(404).json({
        success: false,
        message: 'Freelancer not found'
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
});

// @desc    Get client profile
// @route   GET /api/users/client/:id
// @access  Public
router.get('/client/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name companyName companyDescription industry website rating totalJobsPosted totalJobsCompleted location avatar');
    
    if (!user || user.role !== 'client') {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
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
});

module.exports = router;