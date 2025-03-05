# Project Overview
HandsOn is a community-driven social volunteering platform that connects individuals with meaningful social impact opportunities. Users can discover and join volunteer-driven events, post requests for community help, form teams for large-scale initiatives, and track their impact with contributions logged on a personal and team level. This platform encourages social responsibility, community collaboration, and proactive engagement in volunteer work.

# Technologies Used
- Node.js
- Express.js
- PostgreSQL
- React.js
- Vite
- Tailwind CSS
- JWT for authentication

# Features
- User Registration & Profile Management
- Discover & Join Volunteer Events
- Community Help Requests
- Form Teams & Group Initiatives
- Impact Tracking & Social Recognition

# Database Schema
The database schema includes the following key entities:
- User
- Event
- HelpRequest
- Team

# Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hands-on-volunteering-platform.git
   ```
2. Navigate to the backend directory and install dependencies:
   ```
   cd hands-on-volunteering-platform/backend
   npm install
   ```
3. Set up the database by running the SQL scripts in the `database` directory.
4. Start the backend server:
   ```
   npm start
   ```
5. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```
6. Start the frontend application:
   ```
   npm start
   ```

# API Documentation
- **User Registration**: POST `/api/users/register`
- **User Login**: POST `/api/users/login`
- **Create Event**: POST `/api/events`
- **Join Event**: POST `/api/events/join`
- **Post Help Request**: POST `/api/help-requests`
- **Log Volunteer Hours**: POST `/api/volunteer-hours`

# Running the Project
To run the project locally, follow the setup instructions above. For production, ensure to set environment variables and build the frontend application using:
```
npm run build
```