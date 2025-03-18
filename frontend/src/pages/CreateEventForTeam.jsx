import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCreateEventForTeamMutation } from '../slices/teamSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CreateEventForTeam = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [createEventForTeam, { isLoading: isCreatingEvent, error: createEventError }] = useCreateEventForTeamMutation();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEventForTeam({ teamId, event }).unwrap();
      navigate(`/teams/${teamId}`);
      alert('Event created successfully');
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-calendar-plus mr-2"></i>Create Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time:</label>
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={event.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/teams/${teamId}/dashboard`)}
              className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
            >
              <i className="fas fa-times mr-2"></i>Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
            >
              <i className="fas fa-paper-plane mr-2"></i>Create Event
            </button>
          </div>
          {isCreatingEvent && <p className="text-center text-gray-500">Loading...</p>}
          {createEventError && <p className="text-center text-red-500">{createEventError.data?.message || createEventError.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEventForTeam;