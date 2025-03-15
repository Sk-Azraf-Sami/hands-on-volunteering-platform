import React from 'react';
import { useGetLeaderboardQuery } from '../slices/teamSlice';

const Leaderboard = () => {
  const { data: leaderboard, isLoading, error } = useGetLeaderboardQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Leaderboard</h2>
      <ul>
        {leaderboard.map((team) => (
          <li key={team.id} className="mb-4">
            <div className="flex justify-between">
              <span>{team.name}</span>
              <span>{team.member_count} members</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;