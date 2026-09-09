// backend/src/models/index.js
const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');
const Project = require('./Project');
const Message = require('./Message');
const Review = require('./Review');
const Category = require('./Category');
const Portfolio = require('./portfolio');

module.exports = {
  User,
  Job,
  Application,
  Project,
  Message,
  Review,
  Category,
  Portfolio
};