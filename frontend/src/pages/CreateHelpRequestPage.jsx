import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateHelpRequestMutation } from '../slices/helpRequestSlice';

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Help Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={helpRequest.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={helpRequest.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency:</label>
          <select
            name="urgency"
            value={helpRequest.urgency}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Create Help Request
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.data?.message || error.error}</p>}
      </form>
    </div>
  );
};

export default CreateHelpRequestPage;