import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateHelpRequestMutation } from '../slices/helpRequestSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CreateHelpRequestPage = () => {
  const [helpRequest, setHelpRequest] = useState({
    title: '',
    description: '',
    urgency: 'low',
  });

  const [createHelpRequest, { isLoading, error }] = useCreateHelpRequestMutation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHelpRequest({
      ...helpRequest,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHelpRequest(helpRequest).unwrap();
      console.log('Help request created successfully');
      navigate('/help-requests'); // Redirect to help requests page after successful creation
    } catch (err) {
      console.error('Failed to create help request:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-plus-circle mr-2"></i>Create Help Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={helpRequest.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              value={helpRequest.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Urgency:</label>
            <select
              name="urgency"
              value={helpRequest.urgency}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
            <i className="fas fa-paper-plane mr-2"></i>Create Help Request
          </button>
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.data?.message || error.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateHelpRequestPage;