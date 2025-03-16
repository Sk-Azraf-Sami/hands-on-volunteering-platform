const logHours = async (hours) => {
  const { userId, eventId, hoursSpent, verified } = hours;
  const result = await pool.query(
    'INSERT INTO volunteer_hours (user_id, event_id, hours_spent, verified) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, eventId, hoursSpent, verified]
  );
  return result.rows[0];
};

// Add a function to verify hours
const verifyHours = async (hoursId, verified) => {
  const result = await pool.query(
    'UPDATE volunteer_hours SET verified = $1 WHERE id = $2 RETURNING *',
    [verified, hoursId]
  );
  return result.rows[0];
};

// Add a function to get hours by user
const getHoursByUser = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM volunteer_hours WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

// Add a function to get the leaderboard
const getLeaderboard = async () => {
  const result = await pool.query(
    `SELECT user_id, SUM(hours_spent) as total_hours
     FROM volunteer_hours
     WHERE verified = true
     GROUP BY user_id
     ORDER BY total_hours DESC
     LIMIT 10`
  );
  return result.rows;
};

export { logHours, verifyHours, getHoursByUser, getLeaderboard };