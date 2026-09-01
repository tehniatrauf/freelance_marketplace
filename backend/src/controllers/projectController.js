// backend/src/controllers/projectController.js
const Project = require('../models/Project');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Create a project (after hiring)
// @route   POST /api/projects
// @access  Private (Client only)
exports.createProject = async (req, res) => {
  try {
    const { jobId, freelancerId, budget, deadline } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create project for this job'
      });
    }

    // Update application status
    await Application.findOneAndUpdate(
      { job: jobId, freelancer: freelancerId },
      { status: 'accepted' }
    );

    const project = await Project.create({
      job: jobId,
      client: req.user.id,
      freelancer: freelancerId,
      title: job.title,
      description: job.description,
      budget: budget || parseInt(job.budget.replace(/[^0-9]/g, '')),
      deadline: deadline || job.deadline,
      startDate: Date.now()
    });

    // Update job status
    job.status = 'active';
    job.hiredFreelancer = freelancerId;
    await job.save();

    res.status(201).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get client's projects
// @route   GET /api/projects/client
// @access  Private (Client only)
exports.getClientProjects = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user.id })
      .populate('freelancer', 'name email avatar rating')
      .populate('job', 'title budget')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get freelancer's projects
// @route   GET /api/projects/freelancer
// @access  Private (Freelancer only)
exports.getFreelancerProjects = async (req, res) => {
  try {
    const projects = await Project.find({ freelancer: req.user.id })
      .populate('client', 'name email avatar rating')
      .populate('job', 'title budget')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private (Client or Freelancer involved)
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email avatar rating')
      .populate('freelancer', 'name email avatar rating')
      .populate('job', 'title budget skills');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.client.toString() !== req.user.id && 
        project.freelancer.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this project'
      });
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit work
// @route   POST /api/projects/:id/submit
// @access  Private (Freelancer only)
exports.submitWork = async (req, res) => {
  try {
    const { title, description, link, files } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.freelancer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only the assigned freelancer can submit work'
      });
    }

    project.submissions.push({
      title,
      description,
      link,
      files: files || [],
      submittedAt: Date.now(),
      status: 'pending'
    });

    project.status = 'submitted';
    project.progress = 100;
    await project.save();

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve work
// @route   POST /api/projects/:id/approve
// @access  Private (Client only)
exports.approveWork = async (req, res) => {
  try {
    const { submissionId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only the client can approve work'
      });
    }

    const submission = project.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    submission.status = 'approved';
    project.status = 'completed';
    project.completedAt = Date.now();
    project.progress = 100;

    // Update stats
    await Promise.all([
      project.populate('job'),
      // Update freelancer stats
      require('../models/User').findByIdAndUpdate(project.freelancer, {
        $inc: { totalJobsCompleted: 1 }
      }),
      // Update job status
      require('../models/Job').findByIdAndUpdate(project.job, {
        status: 'completed'
      })
    ]);

    await project.save();

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Request revision
// @route   POST /api/projects/:id/revision
// @access  Private (Client only)
exports.requestRevision = async (req, res) => {
  try {
    const { submissionId, feedback } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only the client can request revisions'
      });
    }

    const submission = project.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    submission.status = 'revision_requested';
    submission.feedback = feedback;
    project.status = 'revision_requested';

    await project.save();

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};