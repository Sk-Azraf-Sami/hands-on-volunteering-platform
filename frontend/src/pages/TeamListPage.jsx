import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTeamsQuery } from '../slices/teamSlice';

const TeamListPage = () => {
  const { data: teams, isLoading, error } = useGetTeamsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Teams</h2>
        <Link to="/teams/create" className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
          Create Team
        </Link>
      </div>
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-bold">{team.name}</h3>
            <p>{team.description}</p>
            <p>Private: {team.is_private ? 'Yes' : 'No'}</p>
            <Link to={`/teams/${team.id}/dashboard`} className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamListPage;