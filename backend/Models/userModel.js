const db = require('../config/database');

// Create a new user
exports.create = async (userData) => {
  const { email, password, name } = userData;
  const query = `
    INSERT INTO users (email, password, name)
    VALUES ($1, $2, $3)
    RETURNING id, email, name;
  `;
  const { rows } = await db.query(query, [email, password, name]);
  return rows[0];
};

// Find a user by email
exports.findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

// Find a user by ID
exports.findById = async (id) => {
  const query = `SELECT user_id, email, name FROM users WHERE user_id = $1;`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};
