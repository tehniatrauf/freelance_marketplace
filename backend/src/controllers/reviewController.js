// backend/src/controllers/reviewController.js
const Review = require('../models/Review');
const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { projectId, rating, communication, quality, timeliness, professionalism, comment } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Project must be completed to leave a review'
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ project: projectId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Review already exists for this project'
      });
    }

    // Determine reviewer and reviewee
    let reviewer, reviewee;
    if (req.user.id === project.client.toString()) {
      reviewer = project.client;
      reviewee = project.freelancer;
    } else if (req.user.id === project.freelancer.toString()) {
      reviewer = project.freelancer;
      reviewee = project.client;
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to review this project'
      });
    }

    const review = await Review.create({
      project: projectId,
      reviewer,
      reviewee,
      rating,
      communication: communication || rating,
      quality: quality || rating,
      timeliness: timeliness || rating,
      professionalism: professionalism || rating,
      comment
    });

    // Update reviewee's rating
    const reviews = await Review.find({ reviewee });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    await User.findByIdAndUpdate(reviewee, {
      rating: averageRating,
      totalReviews: reviews.length
    });

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get reviews for a user
// @route   GET /api/reviews/user/:userId
// @access  Public
exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ reviewee: userId })
      .populate('reviewer', 'name avatar')
      .populate('project', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get reviews for a project
// @route   GET /api/reviews/project/:projectId
// @access  Private
exports.getProjectReviews = async (req, res) => {
  try {
    const { projectId } = req.params;
    const review = await Review.findOne({ project: projectId })
      .populate('reviewer', 'name avatar')
      .populate('reviewee', 'name avatar');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'No review found for this project'
      });
    }

    res.status(200).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};