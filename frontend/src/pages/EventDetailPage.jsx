import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventQuery, useJoinEventMutation } from '../slices/eventSlice';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const { data: event, isLoading, error } = useGetEventQuery(eventId);
  const [joinEvent, { isLoading: isJoining, error: joinError }] = useJoinEventMutation();

  const handleJoin = async () => {
    try {
      await joinEvent(eventId).unwrap();
      console.log('Joined event successfully');
    } catch (err) {
      console.error('Failed to join event:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">{event.title}</h2>
      <p>{event.description}</p>
      <p>{event.date} at {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Category: {event.category}</p>
      <button onClick={handleJoin} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
        Join Event
      </button>
      {isJoining && <p>Joining...</p>}
      {joinError && <p className="text-red-500">{joinError.data?.message || joinError.error}</p>}
    </div>
  );
};

export default EventDetailPage;