// backend/src/models/User.js
const { getConnection, sql } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async findOne(where) {
    const pool = getConnection();
    const email = where.email;
    
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    
    return result.recordset[0] || null;
  }

  static async create(userData) {
    const pool = getConnection();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const result = await pool.request()
      .input('name', sql.VarChar, userData.name)
      .input('email', sql.VarChar, userData.email)
      .input('password', sql.VarChar, hashedPassword)
      .input('role', sql.VarChar, userData.role || 'freelancer')
      .input('phone', sql.VarChar, userData.phone || null)
      .input('location', sql.VarChar, userData.location || null)
      .input('companyName', sql.VarChar, userData.companyName || null)
      .input('industry', sql.VarChar, userData.industry || null)
      .input('title', sql.VarChar, userData.title || null)
      .input('bio', sql.NVarChar, userData.bio || null)
      .input('skills', sql.NVarChar, userData.skills ? JSON.stringify(userData.skills) : null)
      .input('hourlyRate', sql.Decimal, userData.hourlyRate || 0)
      .query(`
        INSERT INTO users (name, email, password, role, phone, location, 
          company_name, industry, title, bio, skills, hourly_rate)
        SELECT @name, @email, @password, @role, @phone, @location,
          @companyName, @industry, @title, @bio, @skills, @hourlyRate;
        
        SELECT * FROM users WHERE id = SCOPE_IDENTITY();
      `);
    
    return result.recordset[0];
  }

  static async findById(id) {
    const pool = getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM users WHERE id = @id');
    
    if (result.recordset.length === 0) return null;
    const user = result.recordset[0];
    if (user.skills) {
      try { user.skills = JSON.parse(user.skills); } 
      catch (e) { user.skills = []; }
    }
    return user;
  }

  static async findByEmail(email) {
    return this.findOne({ email });
  }

  static async matchPassword(email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  static async update(id, updateData) {
    const pool = getConnection();
    const fields = [];
    const request = pool.request();
    request.input('id', sql.Int, id);
    
    Object.keys(updateData).forEach(key => {
      if (key !== 'id' && key !== 'password') {
        const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        fields.push(`${dbField} = @${key}`);
        request.input(key, sql.NVarChar, updateData[key]);
      }
    });
    
    fields.push('updated_at = GETDATE()');
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = @id`;
    await request.query(query);
    return await this.findById(id);
  }
}

module.exports = User;