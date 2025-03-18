import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTeamsQuery } from '../slices/teamSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TeamListPage = () => {
  const { data: teams, isLoading, error } = useGetTeamsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-violet-600">
            <i className="fas fa-users mr-2"></i>Teams
          </h2>
          <Link to="/teams/create" className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300">
            <i className="fas fa-plus mr-2"></i>Create Team
          </Link>
        </div>
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="p-6 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-users mr-2"></i>{team.name}
              </h3>
              <p className="text-gray-600">
                <i className="fas fa-align-left mr-2"></i>{team.description}
              </p>
              <p className="text-gray-600">
                <i className="fas fa-lock mr-2"></i>Private: {team.is_private ? 'Yes' : 'No'}
              </p>
              <Link to={`/teams/${team.id}/dashboard`} className="mt-2 inline-block py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
                <i className="fas fa-eye mr-2"></i>View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamListPage;