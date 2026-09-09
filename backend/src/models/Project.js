// backend/src/models/Project.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
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
    allowNull: true
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('in_progress', 'submitted', 'revision_requested', 'approved', 'completed', 'cancelled'),
    defaultValue: 'in_progress'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  submissions: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  files: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  completedAt: {
    type: DataTypes.DATE,
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
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
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

module.exports = Project;