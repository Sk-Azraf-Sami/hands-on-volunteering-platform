import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import RegPage from './pages/RegPage';
import LoginPage from './pages/LoginPage';
import CreateEventPage from './pages/CreateEventPage';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateHelpRequestPage from './pages/CreateHelpRequestPage';
import HelpRequestListPage from './pages/HelpRequestListPage';
import HelpRequestDetailPage from './pages/HelpRequestDetailPage';
import CreateTeamPage from './pages/CreateTeamPage';
import TeamListPage from './pages/TeamListPage';
import TeamDetailPage from './pages/TeamDetailPage';
import TeamDashboard from './pages/TeamDashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogHoursPage from './pages/LogHoursPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/registration" element={<RegPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/events/create" element={<CreateEventPage />} />
              <Route path="/events" element={<EventListPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/help-requests/create" element={<CreateHelpRequestPage />} />
              <Route path="/help-requests" element={<HelpRequestListPage />} />
              <Route path="/help-requests/:helpRequestId" element={<HelpRequestDetailPage />} />
              <Route path="/teams/create" element={<CreateTeamPage />} />
              <Route path="/teams" element={<TeamListPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} /> {/* Move this line up */}
              <Route path="/teams/:teamId/dashboard" element={<TeamDashboard />} />
              <Route path="/teams/:teamId" element={<TeamDetailPage />} />
              <Route path="/log-hours" element={<LogHoursPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;