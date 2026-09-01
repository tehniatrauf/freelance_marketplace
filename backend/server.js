// backend/server.js
const app = require('./src/app');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // User joins with their userId
  socket.on('user-joined', (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.userId = userId;
    console.log(`User ${userId} is online`);
    
    // Broadcast online status
    io.emit('user-online', Array.from(onlineUsers.keys()));
  });

  // Send message
  socket.on('send-message', async (data) => {
    const { conversationId, receiverId, text, attachments } = data;
    
    // Save message to database (you need to implement this)
    // const message = await Message.create({...});
    
    // Send to receiver if online
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('new-message', {
        conversationId,
        message: {
          id: Date.now(),
          text,
          attachments,
          senderId: socket.userId,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Acknowledge sender
    socket.emit('message-sent', { success: true });
  });

  // User typing
  socket.on('typing', (data) => {
    const { receiverId, conversationId } = data;
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('user-typing', {
        conversationId,
        userId: socket.userId
      });
    }
  });

  // User stopped typing
  socket.on('stop-typing', (data) => {
    const { receiverId, conversationId } = data;
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('user-stopped-typing', {
        conversationId,
        userId: socket.userId
      });
    }
  });

  // Mark messages as read
  socket.on('mark-read', (data) => {
    const { conversationId, senderId } = data;
    const senderSocketId = onlineUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit('messages-read', {
        conversationId,
        userId: socket.userId
      });
    }
  });

  // User disconnects
  socket.on('disconnect', () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      io.emit('user-offline', socket.userId);
      console.log(`User ${socket.userId} disconnected`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
});