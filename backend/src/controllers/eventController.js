import { createEvent, getEvents, joinEvent } from '../models/eventModel.js';

const create = async (req, res) => {
  try {
    const newEvent = await createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const join = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // Use authenticated user's ID
    const attendee = await joinEvent(eventId, userId);
    res.status(200).json(attendee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { create, list, join };