import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetTeamQuery, useJoinTeamMutation, useWithdrawTeamMutation, useSendInvitationMutation, useAcceptInvitationMutation, useDeleteTeamMutation, useUpdateTeamMutation } from '../slices/teamSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TeamDashboard = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { data: team, isLoading, error, refetch } = useGetTeamQuery(parseInt(teamId, 10));
  const [joinTeam, { isLoading: isJoining, error: joinError }] = useJoinTeamMutation();
  const [withdrawTeam, { isLoading: isWithdrawing, error: withdrawError }] = useWithdrawTeamMutation();
  const [sendInvitation, { isLoading: isSending, error: sendError }] = useSendInvitationMutation();
  const [acceptInvitation, { isLoading: isAccepting, error: acceptError }] = useAcceptInvitationMutation();
  const [deleteTeam, { isLoading: isDeleting, error: deleteError }] = useDeleteTeamMutation();
  const [updateTeam, { isLoading: isUpdating, error: updateError }] = useUpdateTeamMutation();
  const user = useSelector((state) => state.auth.user);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamIsPrivate, setTeamIsPrivate] = useState(false);

  useEffect(() => {
    if (!isLoading && !error) {
      refetch();
    }
  }, [isLoading, error, refetch]);

  useEffect(() => {
    if (team) {
      setTeamName(team.name);
      setTeamDescription(team.description);
      setTeamIsPrivate(team.is_private);
    }
  }, [team]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  if (!team) return <p>No team data available</p>;

  const isMember = team.members ? team.members.some((member) => member.id === user?.id) : false;
  const isCreator = team.user_id === user?.id;

  const handleJoin = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await joinTeam({ teamId }).unwrap();
      refetch();
      alert('Successfully joined the team');
    } catch (err) {
      console.error('Failed to join team:', err);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawTeam({ teamId }).unwrap();
      refetch();
      alert('Successfully withdrew from the team');
    } catch (err) {
      console.error('Failed to withdraw from team:', err);
    }
  };

  const handleSendInvitation = async (e) => {
    e.preventDefault();
    try {
      const response = await sendInvitation({ teamId, recipientEmail }).unwrap();
      setRecipientEmail('');
      alert(response.message);
    } catch (err) {
      console.error('Failed to send invitation:', err);
    }
  };

  const handleDeleteTeam = async () => {
    try {
      await deleteTeam(teamId).unwrap();
      alert('Team deleted successfully');
      navigate('/teams');
    } catch (err) {
      console.error('Failed to delete team:', err);
    }
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    try {
      await updateTeam({ teamId, name: teamName, description: teamDescription, isPrivate: teamIsPrivate }).unwrap();
      setEditMode(false);
      refetch();
      alert('Team updated successfully');
    } catch (err) {
      console.error('Failed to update team:', err);
    }
  };

  return (
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-users mr-2"></i>{team.name} Dashboard
        </h2>
        <h3 className="text-xl font-bold mt-6">
          <i className="fas fa-user-friends mr-2"></i>Members
        </h3>
        <ul className="list-disc list-inside">
          {team.members && team.members.length > 0 ? (
            team.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))
          ) : (
            <p>No members available</p>
          )}
        </ul>
        <h3 className="text-xl font-bold mt-6">
          <i className="fas fa-calendar-alt mr-2"></i>Events
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {team.events && team.events.length > 0 ? (
            team.events.map((event) => (
              <div key={event.id} className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-lg font-bold">{event.title}</h4>
                <p>{event.description}</p>
                <p>{event.date} at {event.time}</p>
                <p>{event.location}</p>
                <p>Category: {event.category}</p>
              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
        <h3 className="text-xl font-bold mt-6">
          <i className="fas fa-trophy mr-2"></i>Achievements
        </h3>
        <ul className="list-disc list-inside">
          {team.achievements && team.achievements.length > 0 ? (
            team.achievements.map((achievement) => (
              <li key={achievement.id}>{achievement.title}</li>
            ))
          ) : (
            <p>No achievements available</p>
          )}
        </ul>
        {!isMember ? (
          <button
            onClick={handleJoin}
            className="mt-4 py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
            disabled={isJoining}
          >
            {isJoining ? 'Joining...' : 'Join Team'}
          </button>
        ) : (
          <button
            onClick={handleWithdraw}
            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
            disabled={isWithdrawing}
          >
            {isWithdrawing ? 'Withdrawing...' : 'Withdraw from Team'}
          </button>
        )}
        {joinError && <p className="text-red-500">{joinError.data?.message || joinError.error}</p>}
        {withdrawError && <p className="text-red-500">{withdrawError.data?.message || withdrawError.error}</p>}
        {team.is_private && isCreator && (
          <form onSubmit={handleSendInvitation} className="mt-6">
            <h3 className="text-xl font-bold">
              <i className="fas fa-envelope mr-2"></i>Send Invitation
            </h3>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Recipient Email"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Invitation'}
            </button>
            {sendError && <p className="text-red-500">{sendError.data?.message || sendError.error}</p>}
          </form>
        )}
        {isCreator && (
          <div className="mt-6 space-y-4">
            <button
              onClick={() => setEditMode(true)}
              className="py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition duration-300"
            >
              <i className="fas fa-edit mr-2"></i>Edit Team
            </button>
            <button
              onClick={handleDeleteTeam}
              className="ml-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Team'}
            </button>
            {deleteError && <p className="text-red-500">{deleteError.data?.message || deleteError.error}</p>}
          </div>
        )}
        {editMode && (
          <form onSubmit={handleUpdateTeam} className="mt-6">
            <h3 className="text-xl font-bold">
              <i className="fas fa-edit mr-2"></i>Edit Team
            </h3>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <textarea
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              placeholder="Team Description"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <label className="mt-2 inline-flex items-center">
              <input
                type="checkbox"
                checked={teamIsPrivate}
                onChange={(e) => setTeamIsPrivate(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2">Private Team</span>
            </label>
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Team'}
            </button>
            {updateError && <p className="text-red-500">{updateError.data?.message || updateError.error}</p>}
          </form>
        )}
        {isCreator && (
          <div className="mt-6">
            <button
              onClick={() => navigate(`/teams/${teamId}/create-event`)}
              className="py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
            >
              <i className="fas fa-calendar-plus mr-2"></i>Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;