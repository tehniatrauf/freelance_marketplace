// backend/src/config/database.js
const { Sequelize } = require('sequelize');

// Get database URL from environment
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  console.error('Please add DATABASE_URL to your environment variables');
  process.exit(1);
}

console.log('🔄 Connecting to PostgreSQL...');
console.log(`📡 Using database: ${databaseUrl.replace(/:[^:]*@/, ':****@')}`);

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected successfully!');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');
    return sequelize;
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };