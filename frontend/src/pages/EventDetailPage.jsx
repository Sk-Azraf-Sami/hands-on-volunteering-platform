import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventQuery, useJoinEventMutation } from '../slices/eventSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-calendar-alt mr-2"></i>{event.title}
        </h2>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-700 mb-2"><i className="fas fa-clock mr-2"></i>{event.date} at {event.time}</p>
        <p className="text-gray-700 mb-2"><i className="fas fa-map-marker-alt mr-2"></i>Location: {event.location}</p>
        <p className="text-gray-700 mb-6"><i className="fas fa-tags mr-2"></i>Category: {event.category}</p>
        <button onClick={handleJoin} className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
          <i className="fas fa-sign-in-alt mr-2"></i>Join Event
        </button>
        {isJoining && <p className="text-center text-gray-500 mt-4">Joining...</p>}
        {joinError && <p className="text-center text-red-500 mt-4">{joinError.data?.message || joinError.error}</p>}
      </div>
    </div>
  );
};

export default EventDetailPage;