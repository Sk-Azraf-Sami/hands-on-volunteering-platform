const pool = require('../config/db');

const createUser = async (user) => {
  const { email, password, name, skills, causes } = user;
  const result = await pool.query(
    'INSERT INTO users (email, password, name, skills, causes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [email, password, name, skills, causes]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};