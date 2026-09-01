// backend/src/config/database.js
const sql = require('mssql');
require('dotenv').config();

// SQL Server Authentication
const dbConfig = {
  server: process.env.DB_HOST || 'DESKTOP-QI6H2EA',
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'freelance_marketplace',
  user: process.env.DB_USER || 'freelance_user',
  password: process.env.DB_PASSWORD || 'YourStrongPassword123!',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

let pool = null;

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to SQL Server with SQL Authentication...');
    pool = await sql.connect(dbConfig);
    console.log('✅ SQL Server Connected successfully!');
    
    // Test connection
    const result = await pool.request().query('SELECT 1 AS test');
    console.log('✅ Database test query successful');
    
    return pool;
  } catch (error) {
    console.error('❌ SQL Server Connection Error:', error.message);
    console.log('💡 Check your username and password in .env');
    process.exit(1);
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return pool;
};

module.exports = { connectDB, getConnection, sql };