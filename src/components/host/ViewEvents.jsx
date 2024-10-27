import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../cssS/ViewEvents.css';
import config from "../../config.js";

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const port = config.backendUrl;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/loginhost');
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${port}/events/view-events`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [navigate]);

  if (loading) return <div className="loading">טוען...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-events-container">
      <h1 className="view-events-title">האירועים שלי</h1>
      {events.length === 0 ? (
        <p className="no-events">אין אירועים להצגה כרגע.</p>
      ) : (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <h2 className="event-name">{event.eventName}</h2>
              <p className="event-guests">כמות מוזמנים: {event.totalGuests}</p>
              <p className="event-confirmed-guests">מוזמנים שאישרו: {event.confirmedGuests}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewEvents;