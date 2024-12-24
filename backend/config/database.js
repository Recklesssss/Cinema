require('dotenv').config();
const { Pool } = require('pg');

// Use the connection string from the .env file
const pool = new Pool({
  connectionString: process.env.POSTGRES,
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
