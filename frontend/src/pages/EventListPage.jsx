import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetEventsQuery, useJoinEventMutation, useWithdrawEventMutation } from '../slices/eventSlice';

const EventListPage = () => {
  const { data: initialEvents, isLoading, error } = useGetEventsQuery();
  const [joinEvent] = useJoinEventMutation();
  const [withdrawEvent] = useWithdrawEventMutation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    if (initialEvents) {
      const joinedEventIds = initialEvents.filter(event => event.isJoined).map(event => event.id);
      setJoinedEvents(joinedEventIds);
      setEvents(initialEvents);
    }
  }, [initialEvents]);

  const handleJoin = async (eventId) => {
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    try {
      await joinEvent({ eventId: parseInt(eventId, 10) }).unwrap();
      setJoinedEvents((prevJoinedEvents) => [...prevJoinedEvents, eventId]); // Add event ID to joined events
      setEvents((prevEvents) => prevEvents.map(event => 
        event.id === eventId ? { ...event, isJoined: true, joineduserscount: event.joineduserscount + 1 } : event
      )); // Update event state
      console.log('Joined event successfully');
    } catch (err) {
      console.error('Failed to join event:', err);
    }
  };

  const handleWithdraw = async (eventId) => {
    try {
      const parsedEventId = parseInt(eventId, 10);
      if (isNaN(parsedEventId)) {
        throw new Error(`Invalid eventId: ${eventId}`);
      }
      const payload = { eventId: parsedEventId };
      console.log('Withdraw payload:', payload);
      
      // Log the API endpoint and method
      console.log('API endpoint: /api/events/withdraw');
      console.log('HTTP method: POST');
      console.log()
      const response = await withdrawEvent(payload).unwrap();
      console.log('Withdraw response:', response);
      
      setJoinedEvents((prevJoinedEvents) => prevJoinedEvents.filter(id => id !== parsedEventId)); // Remove event ID from joined events
      setEvents((prevEvents) => prevEvents.map(event => 
        event.id === parsedEventId ? { ...event, isJoined: false, joineduserscount: event.joineduserscount - 1 } : event
      )); // Update event state
      console.log('Withdrew from event successfully');
    } catch (err) {
      console.error('Failed to withdraw from event:', err);
      console.error('Error details:', err.data);
    }
  };

  const filteredEvents = events.filter(event => 
    (categoryFilter ? event.category === categoryFilter : true) &&
    (locationFilter ? event.location.toLowerCase().includes(locationFilter.toLowerCase()) : true) &&
    (availabilityFilter ? event.isJoined === (availabilityFilter === 'joined') : true)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data?.message || error.error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Upcoming Events</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md">
          <option value="">All</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Environment">Environment</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Location:</label>
        <input type="text" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md" placeholder="Enter location" />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Availability:</label>
        <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md">
          <option value="">All</option>
          <option value="joined">Joined</option>
          <option value="notJoined">Not Joined</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Category: {event.category}</p>
            <p>Joined Users: {event.joineduserscount}</p>
            <p>isJoined: {event.isJoined ? 'true' : 'false'}</p>
            {event.isJoined ? (
              <button
                onClick={() => handleWithdraw(event.id)}
                className="mt-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              >
                Withdraw
              </button>
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