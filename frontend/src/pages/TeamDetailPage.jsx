import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetTeamQuery, useJoinTeamMutation } from '../slices/teamSlice';

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const { data: team, isLoading, error } = useGetTeamQuery(teamId);
  const [joinTeam, { isLoading: isJoining, error: joinError }] = useJoinTeamMutation();
  const userId = useSelector((state) => state.auth.user.id);

  console.log('Fetching team details for teamId:', teamId);
  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('team:', team);

  const handleJoin = async () => {
    try {
      await joinTeam({ teamId }).unwrap();
      alert('Successfully joined the team');
    } catch (err) {
      console.error('Failed to join team:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  if (!team) return <p>No team data available</p>;

  const isMember = team.members ? team.members.some((member) => member.id === userId) : false;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">{team.name}</h2>
      <p>{team.description}</p>
      <p>Private: {team.is_private ? 'Yes' : 'No'}</p>
      {!isMember && (
        <button
          onClick={handleJoin}
          className="mt-4 py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900"
          disabled={isJoining}
        >
          {isJoining ? 'Joining...' : 'Join Team'}
        </button>
      )}
      {joinError && <p className="text-red-500">{joinError.data?.message || joinError.error}</p>}
      <h3 className="text-xl font-bold mt-6">Members</h3>
      <ul>
        {team.members && team.members.length > 0 ? (
          team.members.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))
        ) : (
          <p>No members available</p>
        )}
      </ul>
      <h3 className="text-xl font-bold mt-6">Events</h3>
      <ul>
        {team.events && team.events.length > 0 ? (
          team.events.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))
        ) : (
          <p>No events available</p>
        )}
      </ul>
      <h3 className="text-xl font-bold mt-6">Achievements</h3>
      <ul>
        {team.achievements && team.achievements.length > 0 ? (
          team.achievements.map((achievement) => (
            <li key={achievement.id}>{achievement.title}</li>
          ))
        ) : (
          <p>No achievements available</p>
        )}
      </ul>
    </div>
  );
};

export default TeamDetailPage;