import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetHelpRequestsQuery, useDeleteHelpRequestMutation } from '../slices/helpRequestSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-hands-helping mr-2"></i>Help Requests
        </h2>
        {token && (
          <div className="mb-4 text-right">
            <Link to="/help-requests/create" className="py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
              <i className="fas fa-plus mr-2"></i>Create Help Request
            </Link>
          </div>
        )}
        <div className="space-y-4">
          {helpRequests.map((request) => (
            <div key={request.id} className="p-6 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800">
                <i className=""></i>{request.title}
              </h3>
              <p className="text-gray-600">
                <i className="fas fa-align-left mr-2"></i>{request.description}
              </p>
              <p className="text-gray-600">
                <i className="fas fa-exclamation-circle mr-2"></i>Urgency: {request.urgency}
              </p>
              <Link to={`/help-requests/${request.id}`} className="mt-2 inline-block py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
                <i className="fas fa-eye mr-2"></i>View Details
              </Link>
              {user && user.id === request.user_id && (
                <button onClick={() => handleDelete(request.id)} className="mt-2 ml-2 inline-block py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300">
                  <i className="fas fa-trash-alt mr-2"></i>Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpRequestListPage;