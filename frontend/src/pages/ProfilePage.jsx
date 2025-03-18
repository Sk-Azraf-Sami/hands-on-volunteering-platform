import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetTeamsQuery } from '../slices/teamSlice';
import { useGetEventsQuery } from '../slices/eventSlice';
import { updateUser } from '../slices/userSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState(user);
  const { data: teams, isLoading: isLoadingTeams } = useGetTeamsQuery();
  const { data: events, isLoading: isLoadingEvents } = useGetEventsQuery();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(userInfo)).unwrap();
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const ownedTeams = teams?.filter((team) => team.user_id === user.id) || [];
  const joinedTeams = teams?.filter((team) => team.members?.some((member) => member.id === user.id)) || [];
  const joinedEvents = events?.filter((event) => event.isJoined) || [];

  if (isLoadingTeams || isLoadingEvents) return <p>Loading...</p>;

  return (
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-user-circle mr-2"></i>Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills:</label>
            <input
              type="text"
              name="skills"
              value={userInfo.skills}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Causes:</label>
            <input
              type="text"
              name="causes"
              value={userInfo.causes}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
            <i className="fas fa-save mr-2"></i>Update Profile
          </button>
        </form>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-users mr-2"></i>Teams Owned
          </h3>
          <ul className="list-disc list-inside">
            {ownedTeams.map((team) => (
              <li key={team.id}>
                <a href={`/teams/${team.id}/dashboard`} className="text-violet-600 hover:underline">
                  {team.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-users mr-2"></i>Teams Joined
          </h3>
          <ul className="list-disc list-inside">
            {joinedTeams.map((team) => (
              <li key={team.id}>
                <a href={`/teams/${team.id}/dashboard`} className="text-violet-600 hover:underline">
                  {team.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-calendar-alt mr-2"></i>Events Joined
          </h3>
          <ul className="list-disc list-inside">
            {joinedEvents.map((event) => (
              <li key={event.id}>
                <a href={`/events/${event.id}`} className="text-violet-600 hover:underline">
                  {event.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;