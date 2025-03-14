import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import helpRequestRoutes from './routes/helpRequestRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import volunteerHoursRoutes from './routes/volunteerHoursRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/help-requests', helpRequestRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/volunteer-hours', volunteerHoursRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});