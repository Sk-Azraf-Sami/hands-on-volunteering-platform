import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCreateEventForTeamMutation } from '../slices/teamSlice';

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/teams/${teamId}/dashboard`)}
            className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>
        {isCreatingEvent && <p>Loading...</p>}
        {createEventError && <p className="text-red-500">{createEventError.data?.message || createEventError.error}</p>}
      </form>
    </div>
  );
};

export default CreateEventForTeam;