// backend/src/models/Job.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  budget: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectType: {
    type: DataTypes.ENUM('fixed', 'hourly'),
    defaultValue: 'fixed'
  },
  experienceLevel: {
    type: DataTypes.ENUM('Entry', 'Intermediate', 'Expert'),
    defaultValue: 'Intermediate'
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isRemote: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  freelancersNeeded: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'active', 'closed', 'completed', 'cancelled'),
    defaultValue: 'draft'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isReported: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  reportReason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clientId: {
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

module.exports = Job;