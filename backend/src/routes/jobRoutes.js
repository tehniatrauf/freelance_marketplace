// src/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJob,
  getClientJobs,
  updateJob,
  deleteJob,
  reportJob
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('client'), createJob);

router.get('/client', protect, authorize('client'), getClientJobs);

router.route('/:id')
  .get(getJob)
  .put(protect, authorize('client'), updateJob)
  .delete(protect, authorize('client', 'admin'), deleteJob);

router.post('/:id/report', protect, reportJob);

module.exports = router;