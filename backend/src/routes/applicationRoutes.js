// backend/src/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for job
// @route   POST /api/applications
// @access  Private (Freelancer only)
router.post('/', protect, authorize('freelancer'), async (req, res) => {
  try {
    const { jobId, coverLetter, proposedBudget, estimatedDelivery } = req.body;

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      freelancer: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    const application = await Application.create({
      job: jobId,
      freelancer: req.user.id,
      coverLetter,
      proposedBudget,
      estimatedDelivery
    });

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get my applications
// @route   GET /api/applications/my
// @access  Private (Freelancer only)
router.get('/my', protect, authorize('freelancer'), async (req, res) => {
  try {
    const applications = await Application.find({ freelancer: req.user.id })
      .populate('job', 'title budget deadline status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Client or Admin)
router.get('/job/:jobId', protect, async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the client who posted the job or admin
    if (job.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate('freelancer', 'name email avatar skills title rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Client or Admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user is the client who posted the job or admin
    if (application.job.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;