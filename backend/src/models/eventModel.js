import { pool } from '../config/db.js';

const createEvent = async (event) => {
  const { title, description, date, time, location, category } = event;
  const result = await pool.query(
    'INSERT INTO events (title, description, date, time, location, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, description, date, time, location, category]
  );
  return result.rows[0];
};

const getEvents = async (userId) => {
  const result = await pool.query(`
    SELECT 
      events.*, 
      COUNT(event_attendees.user_id) AS joinedUsersCount,
      CASE 
        WHEN EXISTS (
          SELECT 1 FROM event_attendees 
          WHERE event_attendees.event_id = events.id 
          AND event_attendees.user_id = $1
        ) THEN true 
        ELSE false 
      END AS "isJoined"
    FROM events
    LEFT JOIN event_attendees ON events.id = event_attendees.event_id
    GROUP BY events.id
  `, [userId]);

  //console.log(`userID: ${userId}`);
  //console.log(result.rows); // Log the result for debugging

  return result.rows;
};

const joinEvent = async (eventId, userId) => {
  const result = await pool.query(
    'INSERT INTO event_attendees (event_id, user_id) VALUES ($1, $2) RETURNING *',
    [parseInt(eventId, 10), userId]
  );
  return result.rows[0];
};

const withdrawEvent = async (eventId, userId) => {
  const result = await pool.query(
    'DELETE FROM event_attendees WHERE event_id = $1 AND user_id = $2 RETURNING *',
    [parseInt(eventId, 10), userId]
  );
  console.log(result.rows);
  return result.rows[0];
};

const getJoinedEvents = async (userId) => {
  const result = await pool.query(
    'SELECT event_id FROM event_attendees WHERE user_id = $1',
    [userId]
  );
  return result.rows.map(row => row.event_id);
};

export { createEvent, getEvents, joinEvent, withdrawEvent, getJoinedEvents };