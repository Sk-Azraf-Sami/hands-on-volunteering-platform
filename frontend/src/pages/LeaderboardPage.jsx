import React from 'react';
import { useGetLeaderboardQuery } from '../slices/volunteerHoursSlice';

const LeaderboardPage = () => {
  const { data: leaderboard, isLoading, error } = useGetLeaderboardQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Leaderboard</h2>
      <ul>
        {leaderboard.map((user) => (
          <li key={user.id} className="mb-4">
            <div className="flex justify-between">
              <span>{user.name}</span>
              <span>{user.total_hours} hours</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;