import { createHelpRequest, getHelpRequests, createComment, getComments } from '../models/helpRequestModel.js';

const create = async (req, res) => {
  try {
    const newHelpRequest = await createHelpRequest({ ...req.body, userId: req.user.id });
    res.status(201).json(newHelpRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const helpRequests = await getHelpRequests();
    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const comment = async (req, res) => {
  try {
    const newComment = await createComment({ ...req.body, userId: req.user.id });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listComments = async (req, res) => {
  try {
    const comments = await getComments(req.params.helpRequestId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { create, list, comment, listComments };