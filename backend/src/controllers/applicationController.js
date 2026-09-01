// backend/src/controllers/applicationController.js
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Freelancer only)
exports.createApplication = async (req, res) => {
  try {
    const { jobId, coverLetter, proposedBudget, estimatedDelivery, portfolioItems } = req.body;

    if (req.user.role !== 'freelancer') {
      return res.status(403).json({
        success: false,
        message: 'Only freelancers can apply for jobs'
      });
    }

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
      estimatedDelivery,
      portfolioItems
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
};

// @desc    Get freelancer's applications
// @route   GET /api/applications/my
// @access  Private (Freelancer only)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ freelancer: req.user.id })
      .populate('job', 'title budget deadline status client')
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
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Client who posted the job)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

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
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Client or Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

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
};

// @desc    Withdraw application
// @route   DELETE /api/applications/:id
// @access  Private (Freelancer only)
exports.withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.freelancer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to withdraw this application'
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};