const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

module.exports = {
  pool,
};
