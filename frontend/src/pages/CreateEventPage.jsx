import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateEventMutation } from '../slices/eventSlice';

const CreateEventPage = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });

  const [createEvent, { isLoading, error }] = useCreateEventMutation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventDateTime = new Date(`${event.date}T${event.time}`);
    const now = new Date();

    if (eventDateTime <= now) {
      alert('Event date and time must be in the future.');
      return;
    }

    try {
      await createEvent(event).unwrap();
      console.log('Event created successfully');
      navigate('/events'); // Redirect to events page after successful creation
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
            min={getCurrentDateTime().split('T')[0]} // Set min attribute to current date
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
            min={getCurrentDateTime().split('T')[1]} // Set min attribute to current time
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
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Create Event
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.data?.message || error.error}</p>}
      </form>
    </div>
  );
};

export default CreateEventPage;