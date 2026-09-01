// backend/src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Projects route working'
  });
});

module.exports = router;