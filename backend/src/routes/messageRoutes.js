// backend/src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Message = require('../models/Message');

// Get all conversations for user
router.get('/conversations', protect, async (req, res) => {
  try {
    const conversations = await Message.getConversations(req.user.id);
    res.status(200).json({
      success: true,
      conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get messages for a conversation
router.get('/:conversationId', protect, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.getMessages(conversationId, req.user.id);
    res.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Send a message (REST fallback)
router.post('/', protect, async (req, res) => {
  try {
    const { receiverId, text, attachments } = req.body;
    const conversationId = [req.user.id, receiverId].sort().join('-');
    
    const message = await Message.create({
      conversationId,
      senderId: req.user.id,
      receiverId,
      text,
      attachments
    });
    
    res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;