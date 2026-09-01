// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Make sure all controller functions are defined
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;