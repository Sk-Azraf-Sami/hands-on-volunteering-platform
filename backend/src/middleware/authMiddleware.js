import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    // If no Authorization header, allow the request to proceed without authentication
    if (!authHeader) {
      req.user = null;
      return next();
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

      if (result.rows.length === 0) {
        req.user = null; // If user not found, proceed as an unauthenticated request
      } else {
        req.user = result.rows[0]; // Attach user info if valid
      }
    } catch (error) {
      req.user = null; // Invalid token → proceed without authentication
    }

    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); // Handle unexpected errors
  }
};

export default authMiddleware;
