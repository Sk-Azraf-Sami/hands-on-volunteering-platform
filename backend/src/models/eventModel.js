import { pool } from '../config/db.js';

const createEvent = async (event) => {
  const { title, description, date, time, location, category } = event;
  const result = await pool.query(
    'INSERT INTO events (title, description, date, time, location, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, description, date, time, location, category]
  );
  return result.rows[0];
};

const getEvents = async () => {
  const result = await pool.query('SELECT * FROM events');
  return result.rows;
};

const joinEvent = async (eventId, userId) => {
  const result = await pool.query(
    'INSERT INTO event_attendees (event_id, user_id) VALUES ($1, $2) RETURNING *',
    [eventId, userId]
  );
  return result.rows[0];
};

const getJoinedEvents = async (userId) => {
  const result = await pool.query(
    'SELECT event_id FROM event_attendees WHERE user_id = $1',
    [userId]
  );
  return result.rows.map(row => row.event_id);
};

export { createEvent, getEvents, joinEvent, getJoinedEvents };