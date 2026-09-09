// backend/src/models/Review.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  communication: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  quality: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  timeliness: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  professionalism: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  reviewerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  revieweeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = Review;