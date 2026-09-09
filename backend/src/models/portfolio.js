// backend/src/models/Portfolio.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
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
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true
  },
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
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

module.exports = Portfolio;