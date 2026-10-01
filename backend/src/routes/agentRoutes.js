// backend/src/routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/auth'); // Optional: Only for logged-in users

router.post('/chat', protect, chatWithAgent);

module.exports = router;