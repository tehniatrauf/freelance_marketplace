// backend/src/models/Job.js
const { getConnection, sql } = require('../config/database');

class Job {
  static async create(jobData) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('clientId', sql.Int, jobData.clientId)
      .input('title', sql.VarChar, jobData.title)
      .input('description', sql.NVarChar, jobData.description)
      .input('category', sql.VarChar, jobData.category)
      .input('skills', sql.NVarChar, jobData.skills ? JSON.stringify(jobData.skills) : null)
      .input('budget', sql.VarChar, jobData.budget)
      .input('projectType', sql.VarChar, jobData.projectType || 'fixed')
      .input('experienceLevel', sql.VarChar, jobData.experienceLevel || 'Intermediate')
      .input('deadline', sql.Date, jobData.deadline)
      .input('isRemote', sql.Char, jobData.isRemote ? 'Y' : 'N')
      .input('location', sql.VarChar, jobData.location || null)
      .input('freelancersNeeded', sql.Int, jobData.freelancersNeeded || 1)
      .input('status', sql.VarChar, jobData.status || 'draft')
      .query(`
        INSERT INTO jobs (client_id, title, description, category, skills, 
          budget, project_type, experience_level, deadline, is_remote, 
          location, freelancers_needed, status)
        VALUES (@clientId, @title, @description, @category, @skills,
          @budget, @projectType, @experienceLevel, @deadline, @isRemote,
          @location, @freelancersNeeded, @status);
        
        SELECT * FROM jobs WHERE id = SCOPE_IDENTITY();
      `);
    
    return result.recordset[0];
  }

  static async findAll(filters = {}) {
    const pool = getConnection();
    let query = `
      SELECT j.*, u.name as client_name, u.email as client_email 
      FROM jobs j 
      LEFT JOIN users u ON j.client_id = u.id
      WHERE 1=1
    `;
    const request = pool.request();
    
    if (filters.status) {
      query += ` AND j.status = @status`;
      request.input('status', sql.VarChar, filters.status);
    }
    if (filters.category) {
      query += ` AND j.category = @category`;
      request.input('category', sql.VarChar, filters.category);
    }
    
    query += ` ORDER BY j.created_at DESC`;
    const result = await request.query(query);
    
    return result.recordset.map(row => {
      if (row.skills) {
        try { row.skills = JSON.parse(row.skills); } 
        catch (e) { row.skills = []; }
      }
      return row;
    });
  }

  static async findById(id) {
    const pool = getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT j.*, u.name as client_name, u.email as client_email 
        FROM jobs j 
        LEFT JOIN users u ON j.client_id = u.id 
        WHERE j.id = @id
      `);
    
    if (result.recordset.length === 0) return null;
    const job = result.recordset[0];
    if (job.skills) {
      try { job.skills = JSON.parse(job.skills); } 
      catch (e) { job.skills = []; }
    }
    return job;
  }

  static async getClientJobs(clientId) {
    const pool = getConnection();
    const result = await pool.request()
      .input('clientId', sql.Int, clientId)
      .query(`
        SELECT * FROM jobs 
        WHERE client_id = @clientId 
        ORDER BY created_at DESC
      `);
    
    return result.recordset.map(row => {
      if (row.skills) {
        try { row.skills = JSON.parse(row.skills); } 
        catch (e) { row.skills = []; }
      }
      return row;
    });
  }
}

module.exports = Job;