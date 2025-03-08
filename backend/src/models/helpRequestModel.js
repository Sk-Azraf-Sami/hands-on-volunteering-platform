import {pool} from '../config/db.js';

const createHelpRequest = async (helpRequest) => {
  const { title, description, urgency, userId } = helpRequest;
  const result = await pool.query(
    'INSERT INTO help_requests (title, description, urgency, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, urgency, userId]
  );
  return result.rows[0];
};

const getHelpRequests = async () => {
  const result = await pool.query('SELECT * FROM help_requests');
  return result.rows;
};

const createComment = async (comment) => {
  const { helpRequestId, userId, text } = comment;
  const result = await pool.query(
    'INSERT INTO comments (help_request_id, user_id, text) VALUES ($1, $2, $3) RETURNING *',
    [helpRequestId, userId, text]
  );
  return result.rows[0];
};

const getComments = async (helpRequestId) => {
  const result = await pool.query('SELECT * FROM comments WHERE help_request_id = $1', [helpRequestId]);
  return result.rows;
};

export { createHelpRequest, getHelpRequests, createComment, getComments };