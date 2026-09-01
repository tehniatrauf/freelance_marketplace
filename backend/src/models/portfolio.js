// backend/src/models/Portfolio.js
const { getConnection, sql } = require('../config/database');

class Portfolio {
  // Create new portfolio item
  static async create(portfolioData) {
    const pool = getConnection();
    
    try {
      const result = await pool.request()
        .input('freelancerId', sql.Int, portfolioData.freelancerId)
        .input('title', sql.VarChar, portfolioData.title)
        .input('description', sql.NVarChar, portfolioData.description || null)
        .input('image', sql.VarChar, portfolioData.image || null)
        .input('link', sql.VarChar, portfolioData.link || null)
        .input('github', sql.VarChar, portfolioData.github || null)
        .input('technologies', sql.NVarChar, portfolioData.technologies ? JSON.stringify(portfolioData.technologies) : null)
        .query(`
          INSERT INTO portfolio (freelancer_id, title, description, image, link, github, technologies)
          VALUES (@freelancerId, @title, @description, @image, @link, @github, @technologies);
          
          SELECT * FROM portfolio WHERE id = SCOPE_IDENTITY();
        `);
      
      const portfolio = result.recordset[0];
      if (portfolio.technologies) {
        try {
          portfolio.technologies = JSON.parse(portfolio.technologies);
        } catch (e) {
          portfolio.technologies = [];
        }
      }
      return portfolio;
    } catch (error) {
      throw error;
    }
  }

  // Get all portfolio items for a freelancer
  static async findByFreelancer(freelancerId) {
    const pool = getConnection();
    
    try {
      const result = await pool.request()
        .input('freelancerId', sql.Int, freelancerId)
        .query(`
          SELECT * FROM portfolio 
          WHERE freelancer_id = @freelancerId 
          ORDER BY created_at DESC
        `);
      
      return result.recordset.map(row => {
        if (row.technologies) {
          try {
            row.technologies = JSON.parse(row.technologies);
          } catch (e) {
            row.technologies = [];
          }
        }
        return row;
      });
    } catch (error) {
      throw error;
    }
  }

  // Get single portfolio item by ID
  static async findById(id) {
    const pool = getConnection();
    
    try {
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM portfolio WHERE id = @id');
      
      if (result.recordset.length === 0) return null;
      
      const portfolio = result.recordset[0];
      if (portfolio.technologies) {
        try {
          portfolio.technologies = JSON.parse(portfolio.technologies);
        } catch (e) {
          portfolio.technologies = [];
        }
      }
      return portfolio;
    } catch (error) {
      throw error;
    }
  }

  // Update portfolio item
  static async update(id, updateData) {
    const pool = getConnection();
    
    try {
      const fields = [];
      const request = pool.request();
      request.input('id', sql.Int, id);
      
      Object.keys(updateData).forEach(key => {
        if (key !== 'id' && key !== 'freelancerId') {
          const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          fields.push(`${dbField} = @${key}`);
          
          // Handle JSON fields
          if (key === 'technologies' && Array.isArray(updateData[key])) {
            request.input(key, sql.NVarChar, JSON.stringify(updateData[key]));
          } else {
            request.input(key, sql.NVarChar, updateData[key]);
          }
        }
      });
      
      fields.push('updated_at = GETDATE()');
      
      const query = `UPDATE portfolio SET ${fields.join(', ')} WHERE id = @id`;
      await request.query(query);
      
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Delete portfolio item
  static async delete(id) {
    const pool = getConnection();
    
    try {
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM portfolio WHERE id = @id');
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Delete all portfolio items for a freelancer
  static async deleteAllByFreelancer(freelancerId) {
    const pool = getConnection();
    
    try {
      await pool.request()
        .input('freelancerId', sql.Int, freelancerId)
        .query('DELETE FROM portfolio WHERE freelancer_id = @freelancerId');
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Portfolio;