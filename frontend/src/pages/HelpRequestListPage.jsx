import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetHelpRequestsQuery, useDeleteHelpRequestMutation } from '../slices/helpRequestSlice';

const HelpRequestListPage = () => {
  const { data: helpRequests, isLoading, error } = useGetHelpRequestsQuery();
  const [deleteHelpRequest] = useDeleteHelpRequestMutation();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleDelete = async (helpRequestId) => {
    try {
      await deleteHelpRequest(helpRequestId).unwrap();
      navigate('/help-requests'); // Redirect to help requests page after successful deletion
    } catch (err) {
      console.error('Failed to delete help request:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Help Requests</h2>
      {token && (
        <div className="mb-4 text-right">
          <Link to="/help-requests/create" className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Create Help Request
          </Link>
        </div>
      )}
      <div className="space-y-4">
        {helpRequests.map((request) => (
          <div key={request.id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-bold">{request.title}</h3>
            <p>{request.description}</p>
            <p>Urgency: {request.urgency}</p>
            <Link to={`/help-requests/${request.id}`} className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              View Details
            </Link>
            {user && user.id === request.user_id && (
              <button onClick={() => handleDelete(request.id)} className="mt-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpRequestListPage;