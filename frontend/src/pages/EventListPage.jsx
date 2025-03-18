import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetEventsQuery, useJoinEventMutation, useWithdrawEventMutation } from '../slices/eventSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-violet-600">
            <i className="fas fa-calendar-alt mr-2"></i>Upcoming Events
          </h2>
          <button
            onClick={() => navigate('/events/create')}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
          >
            <i className="fas fa-plus mr-2"></i>Create Event
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Category:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md w-full">
            <option value="">All</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Environment">Environment</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Location:</label>
          <input type="text" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md w-full" placeholder="Enter location" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Availability:</label>
          <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md w-full">
            <option value="">All</option>
            <option value="joined">Joined</option>
            <option value="notJoined">Not Joined</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-6 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-calendar-alt mr-2"></i>{event.title}
              </h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-600"><i className="fas fa-clock mr-2"></i>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
              <p className="text-gray-600"><i className="fas fa-map-marker-alt mr-2"></i>Location: {event.location}</p>
              <p className="text-gray-600"><i className="fas fa-tags mr-2"></i>Category: {event.category}</p>
              <p className="text-gray-600"><i className="fas fa-users mr-2"></i>Joined Users: {event.joineduserscount}</p>
              {event.isJoined ? (
                <button
                  onClick={() => handleWithdraw(event.id)}
                  className="mt-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Withdraw
                </button>
              ) : (
                <button
                  onClick={() => handleJoin(event.id)}
                  className="mt-2 py-2 px-4 bg-violet-500 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>Join
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListPage;