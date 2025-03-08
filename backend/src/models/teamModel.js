import {pool} from '../config/db.js';

const createTeam = async (team) => {
  const { name, description, isPrivate, userId } = team;
  const result = await pool.query(
    'INSERT INTO teams (name, description, is_private, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, isPrivate, userId]
  );
  return result.rows[0];
};

const getTeams = async () => {
  const result = await pool.query('SELECT * FROM teams');
  return result.rows;
};

const getTeamById = async (teamId) => {
  const result = await pool.query('SELECT * FROM teams WHERE id = $1', [teamId]);
  return result.rows[0];
};

const addMember = async (teamId, userId) => {
  const result = await pool.query(
    'INSERT INTO team_members (team_id, user_id) VALUES ($1, $2) RETURNING *',
    [teamId, userId]
  );
  return result.rows[0];
};

const getTeamMembers = async (teamId) => {
  const result = await pool.query('SELECT * FROM team_members WHERE team_id = $1', [teamId]);
  return result.rows;
};

export { createTeam, getTeams, getTeamById, addMember, getTeamMembers };