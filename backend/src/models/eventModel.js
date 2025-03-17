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
    SELECT events.*, 
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
    LEFT JOIN teams ON events.team_id = teams.id
    LEFT JOIN team_members ON teams.id = team_members.team_id
    LEFT JOIN invitations ON teams.id = invitations.team_id
    WHERE teams.is_private = false
    OR teams.user_id = $1
    OR team_members.user_id = $1
    OR invitations.recipient_email = (SELECT email FROM users WHERE id = $1)
    GROUP BY events.id
  `, [userId]);

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

const createEventForTeam = async (event, teamId) => {
  const { title, description, date, time, location, category } = event;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const eventResult = await client.query(
      'INSERT INTO events (title, description, date, time, location, category, team_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, date, time, location, category, teamId]
    );
    const newEvent = eventResult.rows[0];

    const teamMembersResult = await client.query(
      'SELECT user_id FROM team_members WHERE team_id = $1',
      [teamId]
    );
    const teamMembers = teamMembersResult.rows;

    for (const member of teamMembers) {
      await client.query(
        'INSERT INTO event_attendees (event_id, user_id) VALUES ($1, $2)',
        [newEvent.id, member.user_id]
      );
    }

    await client.query('COMMIT');
    return newEvent;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export { createEvent, getEvents, joinEvent, withdrawEvent, getJoinedEvents, createEventForTeam };