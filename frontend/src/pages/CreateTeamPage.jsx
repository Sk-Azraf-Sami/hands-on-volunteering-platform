import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateTeamMutation } from '../slices/teamSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CreateTeamPage = () => {
  const [team, setTeam] = useState({
    name: '',
    description: '',
    isPrivate: false,
  });

  const [createTeam, { isLoading, error }] = useCreateTeamMutation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTeam({
      ...team,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTeam(team).unwrap();
      navigate('/teams'); // Redirect to teams page after successful creation
    } catch (err) {
      console.error('Failed to create team:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-users mr-2"></i>Create Team
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={team.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              value={team.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPrivate"
              checked={team.isPrivate}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-violet-600"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">Private</label>
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
            <i className="fas fa-paper-plane mr-2"></i>Create Team
          </button>
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.data?.message || error.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;