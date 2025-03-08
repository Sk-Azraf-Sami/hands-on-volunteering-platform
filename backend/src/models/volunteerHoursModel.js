import {pool} from '../config/db.js';

const logHours = async (hours) => {
  const { userId, eventId, hoursSpent, verified } = hours;
  const result = await pool.query(
    'INSERT INTO volunteer_hours (user_id, event_id, hours_spent, verified) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, eventId, hoursSpent, verified]
  );
  return result.rows[0];
};

const getHoursByUser = async (userId) => {
  const result = await pool.query('SELECT * FROM volunteer_hours WHERE user_id = $1', [userId]);
  return result.rows;
};

const verifyHours = async (hoursId, verified) => {
  const result = await pool.query(
    'UPDATE volunteer_hours SET verified = $1 WHERE id = $2 RETURNING *',
    [verified, hoursId]
  );
  return result.rows[0];
};

const getLeaderboard = async () => {
  const result = await pool.query(
    'SELECT user_id, SUM(hours_spent) as total_hours FROM volunteer_hours WHERE verified = true GROUP BY user_id ORDER BY total_hours DESC'
  );
  return result.rows;
};

export { logHours, getHoursByUser, verifyHours, getLeaderboard };