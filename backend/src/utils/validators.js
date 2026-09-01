// backend/src/utils/validators.js
const { body, validationResult } = require('express-validator');

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// User registration validation rules
exports.registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase, one lowercase, and one number'),
  body('role')
    .optional()
    .isIn(['client', 'freelancer']).withMessage('Role must be either client or freelancer')
];

// User login validation rules
exports.loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Job creation validation rules
exports.jobValidation = [
  body('title')
    .notEmpty().withMessage('Job title is required')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .notEmpty().withMessage('Job description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('category')
    .notEmpty().withMessage('Category is required'),
  body('skills')
    .isArray().withMessage('Skills must be an array')
    .notEmpty().withMessage('At least one skill is required'),
  body('budget')
    .notEmpty().withMessage('Budget is required'),
  body('deadline')
    .notEmpty().withMessage('Deadline is required')
    .isISO8601().withMessage('Invalid date format')
];

// Application validation rules
exports.applicationValidation = [
  body('jobId')
    .notEmpty().withMessage('Job ID is required')
    .isMongoId().withMessage('Invalid job ID'),
  body('coverLetter')
    .notEmpty().withMessage('Cover letter is required')
    .isLength({ min: 20 }).withMessage('Cover letter must be at least 20 characters'),
  body('proposedBudget')
    .notEmpty().withMessage('Proposed budget is required')
    .isNumeric().withMessage('Budget must be a number')
    .isFloat({ min: 1 }).withMessage('Budget must be greater than 0'),
  body('estimatedDelivery')
    .notEmpty().withMessage('Estimated delivery is required')
];

// Project submission validation
exports.submissionValidation = [
  body('title')
    .notEmpty().withMessage('Submission title is required'),
  body('description')
    .notEmpty().withMessage('Submission description is required')
];

// Review validation
exports.reviewValidation = [
  body('projectId')
    .notEmpty().withMessage('Project ID is required')
    .isMongoId().withMessage('Invalid project ID'),
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .isLength({ max: 500 }).withMessage('Comment must be less than 500 characters')
];