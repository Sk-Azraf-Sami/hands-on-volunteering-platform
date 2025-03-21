import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetHelpRequestQuery, useGetCommentsQuery, useAddCommentMutation, useUpdateHelpRequestMutation, useDeleteHelpRequestMutation } from '../slices/helpRequestSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HelpRequestDetailPage = () => {
  const { helpRequestId } = useParams();
  const navigate = useNavigate();
  const { data: helpRequest, isLoading: isLoadingHelpRequest, error: errorHelpRequest } = useGetHelpRequestQuery(helpRequestId);
  const { data: comments, isLoading: isLoadingComments, error: errorComments, refetch: refetchComments } = useGetCommentsQuery(helpRequestId);
  const [addComment] = useAddCommentMutation();
  const [updateHelpRequest] = useUpdateHelpRequestMutation();
  const [deleteHelpRequest] = useDeleteHelpRequestMutation();
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleAddComment = async () => {
    if (!token) {
      alert('You must be logged in to comment.');
      return;
    }

    try {
      await addComment({ helpRequestId, text: commentText }).unwrap();
      setCommentText('');
      refetchComments(); // Refetch comments to show the new comment immediately
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateHelpRequest({ helpRequestId, data: helpRequest }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update help request:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteHelpRequest(helpRequestId).unwrap();
      navigate('/help-requests'); // Redirect to help requests page after successful deletion
    } catch (err) {
      console.error('Failed to delete help request:', err);
    }
  };

  if (isLoadingHelpRequest || isLoadingComments) return <p>Loading...</p>;
  if (errorHelpRequest) return <p>Error: {errorHelpRequest.data?.message || errorHelpRequest.error}</p>;
  if (errorComments) return <p>Error: {errorComments.data?.message || errorComments.error}</p>;

  return (
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-info-circle mr-2"></i>Help Request Details
        </h2>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                value={helpRequest.title}
                onChange={(e) => setHelpRequest({ ...helpRequest, title: e.target.value })}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                name="description"
                value={helpRequest.description}
                onChange={(e) => setHelpRequest({ ...helpRequest, description: e.target.value })}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Urgency:</label>
              <select
                name="urgency"
                value={helpRequest.urgency}
                onChange={(e) => setHelpRequest({ ...helpRequest, urgency: e.target.value })}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
              <i className="fas fa-save mr-2"></i>Update Help Request
            </button>
          </form>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-800">
              <i className=""></i>{helpRequest.title}
            </h3>
            <div className="mt-4 text-gray-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{helpRequest.description}</ReactMarkdown>
            </div>
            <p className="mt-4 text-gray-600">
              <i className="fas fa-exclamation-circle mr-2"></i>Urgency: {helpRequest.urgency}
            </p>
            <p className="mt-4 text-gray-600">
              <i className="fas fa-calendar-alt mr-2"></i>Posted on: {new Date(helpRequest.created_at).toLocaleString()}
            </p>
            {user && user.id === helpRequest.user_id && (
              <>
                <button onClick={() => setIsEditing(true)} className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300 mt-4">
                  <i className="fas fa-edit mr-2"></i>Edit Help Request
                </button>
                <button onClick={handleDelete} className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 mt-2">
                  <i className="fas fa-trash-alt mr-2"></i>Delete Help Request
                </button>
              </>
            )}
          </>
        )}
        <div className="space-y-4 mt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-800">{comment.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                <i className="fas fa-user mr-2"></i>Posted by {comment.commenter_name} on {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        {token && (
          <div className="mt-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Add a comment"
            />
            <button onClick={handleAddComment} className="mt-2 py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
              <i className="fas fa-comment-dots mr-2"></i>Add Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestDetailPage;