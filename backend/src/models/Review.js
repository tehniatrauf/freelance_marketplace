// backend/src/models/Review.js
const { getConnection, sql } = require('../config/database');

class Review {
  static async create(reviewData) {
    const pool = getConnection();
    
    try {
      const result = await pool.request()
        .input('projectId', sql.VarChar, reviewData.projectId)
        .input('reviewerId', sql.VarChar, reviewData.reviewerId)
        .input('revieweeId', sql.VarChar, reviewData.revieweeId)
        .input('rating', sql.Int, reviewData.rating)
        .input('communication', sql.Int, reviewData.communication || reviewData.rating)
        .input('quality', sql.Int, reviewData.quality || reviewData.rating)
        .input('timeliness', sql.Int, reviewData.timeliness || reviewData.rating)
        .input('professionalism', sql.Int, reviewData.professionalism || reviewData.rating)
        .input('comment', sql.NVarChar, reviewData.comment || null)
        .query(`
          INSERT INTO reviews (project_id, reviewer_id, reviewee_id, rating, 
            communication, quality, timeliness, professionalism, [comment])
          OUTPUT INSERTED.id, INSERTED.rating, INSERTED.created_at
          VALUES (@projectId, @reviewerId, @revieweeId, @rating, 
            @communication, @quality, @timeliness, @professionalism, @comment)
        `);
      
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByUser(userId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('userId', sql.VarChar, userId)
      .query(`
        SELECT r.*, 
          ru.name as reviewer_name, ru.avatar as reviewer_avatar,
          p.title as project_title
        FROM reviews r
        LEFT JOIN users ru ON r.reviewer_id = ru.id
        LEFT JOIN projects p ON r.project_id = p.id
        WHERE r.reviewee_id = @userId
        ORDER BY r.created_at DESC
      `);
    
    return result.recordset;
  }

  static async findByProject(projectId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('projectId', sql.VarChar, projectId)
      .query(`
        SELECT r.*, 
          ru.name as reviewer_name, ru.avatar as reviewer_avatar
        FROM reviews r
        LEFT JOIN users ru ON r.reviewer_id = ru.id
        WHERE r.project_id = @projectId
      `);
    
    return result.recordset[0] || null;
  }

  static async checkExists(projectId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('projectId', sql.VarChar, projectId)
      .query('SELECT id FROM reviews WHERE project_id = @projectId');
    
    return result.recordset.length > 0;
  }

  static async getAverageRating(userId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('userId', sql.VarChar, userId)
      .query(`
        SELECT 
          AVG(CAST(rating AS DECIMAL(3,2))) as average_rating,
          COUNT(*) as total_reviews
        FROM reviews
        WHERE reviewee_id = @userId
      `);
    
    return {
      averageRating: result.recordset[0].average_rating || 0,
      totalReviews: result.recordset[0].total_reviews || 0
    };
  }
}

module.exports = Review;