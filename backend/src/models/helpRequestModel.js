import { pool } from '../config/db.js';

const createHelpRequest = async (helpRequest) => {
  const { title, description, urgency, userId } = helpRequest;
  const result = await pool.query(
    'INSERT INTO help_requests (title, description, urgency, user_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [title, description, urgency, userId]
  );
  return result.rows[0];
};

const getHelpRequests = async () => {
  const result = await pool.query('SELECT * FROM help_requests');
  return result.rows;
};

const getHelpRequestById = async (helpRequestId) => {
  const result = await pool.query('SELECT * FROM help_requests WHERE id = $1', [helpRequestId]);
  return result.rows[0];
};

const updateHelpRequest = async (helpRequestId, helpRequest) => {
  const { title, description, urgency } = helpRequest;
  const result = await pool.query(
    'UPDATE help_requests SET title = $1, description = $2, urgency = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
    [title, description, urgency, helpRequestId]
  );
  return result.rows[0];
};

const deleteHelpRequest = async (helpRequestId) => {
  const result = await pool.query('DELETE FROM help_requests WHERE id = $1 RETURNING *', [helpRequestId]);
  return result.rows[0];
};

const createComment = async (comment) => {
  const { helpRequestId, userId, text } = comment;
  const result = await pool.query(
    'INSERT INTO comments (help_request_id, user_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [helpRequestId, userId, text]
  );
  return result.rows[0];
};

const getComments = async (helpRequestId) => {
  const result = await pool.query(`
    SELECT comments.id, comments.text, comments.created_at, users.name AS commenter_name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.help_request_id = $1
    ORDER BY comments.created_at ASC
  `, [helpRequestId]);
  return result.rows;
};

export { createHelpRequest, getHelpRequests, getHelpRequestById, updateHelpRequest, deleteHelpRequest, createComment, getComments };