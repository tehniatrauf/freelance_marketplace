
// backend/src/models/Project.js
const { getConnection, sql } = require('../config/database');

class Project {
  static async create(projectData) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('jobId', sql.Int, projectData.jobId)
      .input('clientId', sql.Int, projectData.clientId)
      .input('freelancerId', sql.Int, projectData.freelancerId)
      .input('title', sql.VarChar, projectData.title)
      .input('description', sql.NVarChar, projectData.description || null)
      .input('budget', sql.Decimal, projectData.budget)
      .input('deadline', sql.Date, projectData.deadline)
      .query(`
        INSERT INTO projects (job_id, client_id, freelancer_id, title, description, budget, deadline)
        VALUES (@jobId, @clientId, @freelancerId, @title, @description, @budget, @deadline);
        
        SELECT * FROM projects WHERE id = SCOPE_IDENTITY();
      `);
    
    return result.recordset[0];
  }

  static async findByClient(clientId) {
    const pool = getConnection();
    const result = await pool.request()
      .input('clientId', sql.Int, clientId)
      .query(`
        SELECT p.*, 
          u.name as freelancer_name, u.avatar as freelancer_avatar,
          j.title as job_title
        FROM projects p
        LEFT JOIN users u ON p.freelancer_id = u.id
        LEFT JOIN jobs j ON p.job_id = j.id
        WHERE p.client_id = @clientId
        ORDER BY p.created_at DESC
      `);
    
    return result.recordset;
  }

  static async findByFreelancer(freelancerId) {
    const pool = getConnection();
    const result = await pool.request()
      .input('freelancerId', sql.Int, freelancerId)
      .query(`
        SELECT p.*, 
          u.name as client_name, u.avatar as client_avatar,
          j.title as job_title
        FROM projects p
        LEFT JOIN users u ON p.client_id = u.id
        LEFT JOIN jobs j ON p.job_id = j.id
        WHERE p.freelancer_id = @freelancerId
        ORDER BY p.created_at DESC
      `);
    
    return result.recordset;
  }

  static async findById(id) {
    const pool = getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT p.*, 
          c.name as client_name, c.avatar as client_avatar,
          f.name as freelancer_name, f.avatar as freelancer_avatar,
          j.title as job_title
        FROM projects p
        LEFT JOIN users c ON p.client_id = c.id
        LEFT JOIN users f ON p.freelancer_id = f.id
        LEFT JOIN jobs j ON p.job_id = j.id
        WHERE p.id = @id
      `);
    
    return result.recordset[0] || null;
  }

  static async updateStatus(id, status) {
    const pool = getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.VarChar, status)
      .query(`
        UPDATE projects 
        SET status = @status, updated_at = GETDATE()
        WHERE id = @id;
        SELECT * FROM projects WHERE id = @id;
      `);
    
    return result.recordset[0];
  }

  static async updateProgress(id, progress) {
    const pool = getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('progress', sql.Int, progress)
      .query(`
        UPDATE projects 
        SET progress = @progress, updated_at = GETDATE()
        WHERE id = @id;
        SELECT * FROM projects WHERE id = @id;
      `);
    
    return result.recordset[0];
  }
}

module.exports = Project;