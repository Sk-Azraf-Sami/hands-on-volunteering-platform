import { pool } from '../config/db.js';

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
  const teamResult = await pool.query('SELECT * FROM teams WHERE id = $1', [teamId]);
  const team = teamResult.rows[0];

  if (team) {
    const membersResult = await pool.query(`
      SELECT users.id, users.name 
      FROM team_members 
      JOIN users ON team_members.user_id = users.id 
      WHERE team_members.team_id = $1
    `, [teamId]);
    team.members = membersResult.rows;

    const eventsResult = await pool.query('SELECT * FROM events WHERE team_id = $1', [teamId]);
    team.events = eventsResult.rows;

    const achievementsResult = await pool.query('SELECT * FROM achievements WHERE team_id = $1', [teamId]);
    team.achievements = achievementsResult.rows;
  }

  return team;
};

const addMember = async (teamId, userId) => {
  const result = await pool.query(
    'INSERT INTO team_members (team_id, user_id) VALUES ($1, $2) RETURNING *',
    [teamId, userId]
  );
  return result.rows[0];
};

const removeMember = async (teamId, userId) => {
  const result = await pool.query(
    'DELETE FROM team_members WHERE team_id = $1 AND user_id = $2 RETURNING *',
    [teamId, userId]
  );
  return result.rows[0];
};

const getTeamMembers = async (teamId) => {
  const result = await pool.query('SELECT * FROM team_members WHERE team_id = $1', [teamId]);
  return result.rows;
};

const isMember = async (teamId, userId) => {
  const result = await pool.query('SELECT * FROM team_members WHERE team_id = $1 AND user_id = $2', [teamId, userId]);
  return result.rows.length > 0;
};

const createInvitation = async (teamId, senderId, recipientEmail) => {
  const result = await pool.query(
    'INSERT INTO invitations (team_id, sender_id, recipient_email) VALUES ($1, $2, $3) RETURNING *',
    [teamId, senderId, recipientEmail]
  );
  return result.rows[0];
};

const getInvitationById = async (invitationId) => {
  const result = await pool.query('SELECT * FROM invitations WHERE id = $1', [invitationId]);
  return result.rows[0];
};

const acceptInvitation = async (invitationId, userId) => {
  const invitation = await getInvitationById(invitationId);
  if (!invitation) {
    throw new Error('Invitation not found');
  }

  const result = await pool.query(
    'UPDATE invitations SET status = $1 WHERE id = $2 RETURNING *',
    ['accepted', invitationId]
  );

  await addMember(invitation.team_id, userId);

  return result.rows[0];
};

const deleteInvitationsByTeamId = async (teamId) => {
  await pool.query('DELETE FROM invitations WHERE team_id = $1', [teamId]);
};

const deleteTeam = async (teamId) => {
  await pool.query('DELETE FROM teams WHERE id = $1', [teamId]);
};

const getLeaderboard = async () => {
  const result = await pool.query(`
    SELECT teams.id, teams.name, COUNT(team_members.user_id) AS member_count
    FROM teams
    LEFT JOIN team_members ON teams.id = team_members.team_id
    GROUP BY teams.id
    ORDER BY member_count DESC
    LIMIT 10
  `);
  return result.rows;
};

export { createTeam, getTeams, getTeamById, addMember, removeMember, getTeamMembers, isMember, createInvitation, getInvitationById, acceptInvitation, deleteInvitationsByTeamId, deleteTeam, getLeaderboard };