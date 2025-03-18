import { pool } from '../config/db.js';

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

const getUserPoints = async (userId) => {
  const result = await pool.query(
    'SELECT SUM(hours_spent) * 5 AS points FROM volunteer_hours WHERE user_id = $1 AND verified = true',
    [userId]
  );
  return result.rows[0].points;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUserById = async (userId, user) => {
  const { email, name, skills, causes, newPassword } = user;
  const result = await pool.query(
    'UPDATE users SET email = $1, name = $2, skills = $3, causes = $4, password = COALESCE($5, password) WHERE id = $6 RETURNING *',
    [email, name, skills, causes, newPassword, userId]
  );
  return result.rows[0];
};

export { createUser, getUserByEmail, getUserPoints, getUserById, updateUserById }; 