import { createTeam, getTeams, getTeamById, addMember, getTeamMembers } from '../models/teamModel.js';

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
    const team = await getTeamById(req.params.teamId);
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const join = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;
    const member = await addMember(teamId, userId);
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

export { create, list, get, join, listMembers };