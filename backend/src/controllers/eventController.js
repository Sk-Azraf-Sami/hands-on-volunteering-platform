import { createEvent, getEvents, joinEvent, withdrawEvent } from '../models/eventModel.js';

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
    const userId = req.user ? req.user.id : null;
    const events = await getEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const join = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this line to log the request body
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    const userId = req.user.id; // Use authenticated user's ID
    const attendee = await joinEvent(eventId, userId);
    res.status(200).json(attendee);
  } catch (error) {
    console.error('Error joining event:', error); // Add this line to log the error
    res.status(400).json({ message: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this line to log the request body
    const { eventId } = req.body;
    console.log(typeof eventId);
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    const userId = req.user.id; // Use authenticated user's ID
    const attendee = await withdrawEvent(eventId, userId);
    res.status(200).json(attendee);
  } catch (error) {
    console.error('Error joining event:', error); // Add this line to log the error
    res.status(400).json({ message: error.message });
  }
};

export { create, list, join, withdraw };