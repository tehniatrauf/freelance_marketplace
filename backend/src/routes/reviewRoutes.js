// backend/src/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reviews route working'
  });
});

module.exports = router;