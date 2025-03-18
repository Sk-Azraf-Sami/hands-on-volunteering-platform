import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogHoursMutation } from '../slices/volunteerHoursSlice';

const LogHoursPage = () => {
  const [hours, setHours] = useState('');
  const [eventId, setEventId] = useState('');
  const [logHours, { isLoading, error }] = useLogHoursMutation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hours') setHours(value);
    if (name === 'eventId') setEventId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logHours({ hours, eventId }).unwrap();
      console.log('Hours logged successfully');
      navigate('/'); // Redirect to home page after successful logging
    } catch (err) {
      console.error('Failed to log hours:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Log Volunteer Hours</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event ID:</label>
          <input
            type="text"
            name="eventId"
            value={eventId}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hours:</label>
          <input
            type="number"
            name="hours"
            value={hours}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900">
          Log Hours
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.data?.message || error.error}</p>}
      </form>
    </div>
  );
};

export default LogHoursPage;