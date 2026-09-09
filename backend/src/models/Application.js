// backend/src/models/Application.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  proposedBudget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estimatedDelivery: {
    type: DataTypes.STRING,
    allowNull: false
  },
  relevantExperience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  portfolioItems: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('pending', 'shortlisted', 'interview', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Jobs',
      key: 'id'
    }
  },
  freelancerId: {
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

module.exports = Application;