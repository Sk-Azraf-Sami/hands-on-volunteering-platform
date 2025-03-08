import { logHours, getHoursByUser, verifyHours, getLeaderboard } from '../models/volunteerHoursModel.js';

const log = async (req, res) => {
  try {
    const newLog = await logHours({ ...req.body, userId: req.user.id, verified: false });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listByUser = async (req, res) => {
  try {
    const hours = await getHoursByUser(req.user.id);
    res.status(200).json(hours);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const { hoursId, verified } = req.body;
    const updatedLog = await verifyHours(hoursId, verified);
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const leaderboard = async (req, res) => {
  try {
    const leaderboardData = await getLeaderboard();
    res.status(200).json(leaderboardData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { log, listByUser, verify, leaderboard };