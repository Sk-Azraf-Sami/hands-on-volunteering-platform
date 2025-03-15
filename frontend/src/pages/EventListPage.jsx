import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetEventsQuery, useJoinEventMutation } from '../slices/eventSlice';

const EventListPage = () => {
  const { data: events, isLoading, error } = useGetEventsQuery();
  const [joinEvent] = useJoinEventMutation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [joinedEvents, setJoinedEvents] = useState([]);

  const handleJoin = async (eventId) => {
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    try {
      await joinEvent(eventId).unwrap();
      setJoinedEvents([...joinedEvents, eventId]); // Add event ID to joined events
      console.log('Joined event successfully');
    } catch (err) {
      console.error('Failed to join event:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date} at {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Category: {event.category}</p>
            {joinedEvents.includes(event.id) ? (
              <p className="mt-2 text-green-600 font-semibold">You have joined this event</p>
            ) : (
              <button
                onClick={() => handleJoin(event.id)}
                className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Join
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListPage;