const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
dotenv.config();

// Ensure the connection string is defined
if (!process.env.POSTGRES) {
  console.error('POSTGRES environment variable is not defined');
  throw new Error('Environment variable POSTGRES is not defined');
}

console.log('Using PostgreSQL connection string:','postgres://postgres:biruk4you@localhost:6543/cinema');

// Use the connection string from the .env file
const pool = new Pool({
  connectionString: 'postgres://postgres:biruk4you@localhost:6543/cinema',
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};