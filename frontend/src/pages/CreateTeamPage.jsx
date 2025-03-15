import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateTeamMutation } from '../slices/teamSlice';

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Team</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={team.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={team.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Private:</label>
          <input
            type="checkbox"
            name="isPrivate"
            checked={team.isPrivate}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Create Team
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.data?.message || error.error}</p>}
      </form>
    </div>
  );
};

export default CreateTeamPage;