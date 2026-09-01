// backend/src/config/passport.js
const passport = require('passport');
const User = require('../models/User');

// JWT Strategy can be added here if needed
// For now, we're using JWT directly in auth middleware

module.exports = passport;