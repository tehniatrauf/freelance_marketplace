// src/controllers/jobController.js
const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Client only)
exports.createJob = async (req, res) => {
  try {
    req.body.client = req.user.id;
    
    // Check if user is a client
    if (req.user.role !== 'client') {
      return res.status(403).json({
        success: false,
        message: 'Only clients can post jobs'
      });
    }

    const job = await Job.create(req.body);

    // Update client's total jobs posted
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalJobsPosted: 1 }
    });

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { 
      keyword, 
      category, 
      minBudget, 
      maxBudget, 
      experienceLevel, 
      remote,
      page = 1,
      limit = 10,
      sortBy = 'createdAt'
    } = req.query;

    // Build filter object
    const filter = { status: 'published' };

    if (keyword) {
      filter.$text = { $search: keyword };
    }

    if (category) {
      filter.category = category;
    }

    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    if (remote !== undefined) {
      filter.isRemote = remote === 'true';
    }

    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = minBudget;
      if (maxBudget) filter.budget.$lte = maxBudget;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort
    let sort = {};
    if (sortBy === 'recent') sort = { createdAt: -1 };
    else if (sortBy === 'budget_high') sort = { budget: -1 };
    else if (sortBy === 'budget_low') sort = { budget: 1 };
    else sort = { createdAt: -1 };

    const jobs = await Job.find(filter)
      .populate('client', 'name email rating avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      jobs,
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

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('client', 'name email rating avatar companyName totalJobsPosted totalJobsCompleted')
      .populate('applications');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get jobs by client
// @route   GET /api/jobs/client
// @access  Private (Client only)
exports.getClientJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Client only)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user owns the job
    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Client or Admin)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user owns the job or is admin
    if (job.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

    await job.remove();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Report job
// @route   POST /api/jobs/:id/report
// @access  Private
exports.reportJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.isReported = true;
    job.reportReason = req.body.reason;
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job reported successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};