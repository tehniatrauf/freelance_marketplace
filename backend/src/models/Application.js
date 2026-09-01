// backend/src/models/Application.js
const { getConnection, sql } = require('../config/database');

class Application {
  static async create(appData) {
    const pool = getConnection();
    
    try {
      const result = await pool.request()
        .input('jobId', sql.VarChar, appData.jobId)
        .input('freelancerId', sql.VarChar, appData.freelancerId)
        .input('coverLetter', sql.NVarChar, appData.coverLetter)
        .input('proposedBudget', sql.Decimal, appData.proposedBudget)
        .input('estimatedDelivery', sql.VarChar, appData.estimatedDelivery)
        .input('relevantExperience', sql.NVarChar, appData.relevantExperience || null)
        .input('portfolioItems', sql.NVarChar, appData.portfolioItems ? JSON.stringify(appData.portfolioItems) : null)
        .input('status', sql.VarChar, appData.status || 'pending')
        .query(`
          INSERT INTO applications (job_id, freelancer_id, cover_letter, 
            proposed_budget, estimated_delivery, relevant_experience, 
            portfolio_items, status)
          OUTPUT INSERTED.id, INSERTED.status, INSERTED.created_at
          VALUES (@jobId, @freelancerId, @coverLetter, @proposedBudget, 
            @estimatedDelivery, @relevantExperience, @portfolioItems, @status)
        `);
      
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByFreelancer(freelancerId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('freelancerId', sql.VarChar, freelancerId)
      .query(`
        SELECT a.*, j.title as job_title, j.budget as job_budget 
        FROM applications a 
        LEFT JOIN jobs j ON a.job_id = j.id 
        WHERE a.freelancer_id = @freelancerId 
        ORDER BY a.created_at DESC
      `);
    
    return result.recordset;
  }

  static async findByJob(jobId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('jobId', sql.VarChar, jobId)
      .query(`
        SELECT a.*, u.name as freelancer_name, u.email as freelancer_email 
        FROM applications a 
        LEFT JOIN users u ON a.freelancer_id = u.id 
        WHERE a.job_id = @jobId 
        ORDER BY a.created_at DESC
      `);
    
    return result.recordset;
  }

  static async updateStatus(id, status) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('id', sql.VarChar, id)
      .input('status', sql.VarChar, status)
      .query(`
        UPDATE applications 
        SET status = @status, updated_at = GETDATE() 
        WHERE id = @id
        SELECT * FROM applications WHERE id = @id
      `);
    
    return result.recordset[0];
  }
}

module.exports = Application;