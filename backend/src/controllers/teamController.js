import { createTeam, getTeams, getTeamById, addMember, removeMember, getTeamMembers, isMember, createInvitation, acceptInvitation as acceptInvitationModel, deleteTeam as deleteTeamModel, deleteInvitationsByTeamId, getLeaderboard as getLeaderboardModel } from '../models/teamModel.js';

const create = async (req, res) => {
  try {
    const newTeam = await createTeam({ ...req.body, userId: req.user.id });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const teams = await getTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }

    const team = await getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const join = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;
    const team = await getTeamById(teamId);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const alreadyMember = await isMember(teamId, userId);
    if (alreadyMember) {
      return res.status(400).json({ message: 'User is already a member of the team' });
    }

    if (team.is_private) {
      return res.status(403).json({ message: 'Cannot join a private team without an invitation' });
    }

    const member = await addMember(teamId, userId);
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;

    const team = await getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const alreadyMember = await isMember(teamId, userId);
    if (!alreadyMember) {
      return res.status(400).json({ message: 'User is not a member of the team' });
    }

    const member = await removeMember(teamId, userId);
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listMembers = async (req, res) => {
  try {
    const members = await getTeamMembers(req.params.teamId);
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendInvitation = async (req, res) => {
  try {
    const { teamId, recipientEmail } = req.body;
    const senderId = req.user.id;

    const team = await getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (!team.is_private) {
      return res.status(400).json({ message: 'Invitations can only be sent for private teams' });
    }

    if (team.user_id !== senderId) {
      return res.status(403).json({ message: 'Only the team creator can send invitations' });
    }

    const invitation = await createInvitation(teamId, senderId, recipientEmail);
    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.body;
    const userId = req.user.id;

    const invitation = await acceptInvitationModel(invitationId, userId);
    res.status(200).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: 'Invalid team ID' });
    }

    await deleteInvitationsByTeamId(teamId);
    await deleteTeamModel(teamId);
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await getLeaderboardModel();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { create, list, get, join, withdraw, listMembers, sendInvitation, acceptInvitation, deleteTeam, getLeaderboard };