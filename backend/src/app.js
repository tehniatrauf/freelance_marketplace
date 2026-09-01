// backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to database
connectDB().then(() => {
  console.log('✅ Database connection established');
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
});

// Security
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Here you can send email notification, save to database, etc.
    console.log('Contact form submission:', { name, email, subject, message });
    
    // For now, just return success
    res.status(200).json({
      success: true,
      message: 'Message received'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Contact settings endpoint (optional)
app.get('/api/settings/contact', (req, res) => {
  res.json({
    email: process.env.CONTACT_EMAIL || 'support@workconnect.com',
    phone: process.env.CONTACT_PHONE || '+1 (555) 123-4567',
    location: process.env.CONTACT_LOCATION || 'New York, USA',
    address: process.env.CONTACT_ADDRESS || '123 Business Ave, Suite 100, New York, NY 10001'
  });
});

module.exports = app;