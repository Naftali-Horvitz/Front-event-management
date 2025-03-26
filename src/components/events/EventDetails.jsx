import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Clock, Users, Bell, Edit } from 'lucide-react';
import config from "../../config.js";
import { validateToken, getCurrentUser } from "../../utils/authUtils.js";
import { useEventContext } from "../../context/EventDataContext";

const EventDetails = () => {

  const { eventData } = useEventContext();
  const eventId = eventData.eventId;
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const port = config.backendUrl;

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!validateToken()) {
        navigate('/loginhost');
        return;
      }

      try {
        const response = await axios.get(`${port}/events/details/${eventId}`, {
          headers: { Authorization: `Bearer ${getCurrentUser().token}` }
        });
        setEvent({ ...response.data.eventDetails, ...response.data.summary });
        setGuests(response.data.guests);
      } catch (err) {
        setError(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleSendReminders = async () => {
    try {
      await axios.post(`${port}/events/${id}/send-reminders`, {}, {
        headers: { Authorization: `Bearer ${getCurrentUser().token}` }
      });
      alert('תזכורות נשלחו בהצלחה');
    } catch (error) {
      alert('שגיאה בשליחת התזכורות');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading">טוען...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="error bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 pt-16 mt-16" dir="rtl">
      {/* Header with event name and actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.eventName}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/event/${id}/edit`)}
            className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
          >
            <Edit size={20} />
            ערוך אירוע
          </button>
          <button
            onClick={handleSendReminders}
            className="flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200"
          >
            <Bell size={20} />
            שלח תזכורות
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Details Card */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">פרטי האירוע</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar size={20} className="ml-2" />
              <span>{new Date(event.eventDate).toLocaleDateString('he-IL')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={20} className="ml-2" />
              <span>{event.eventTime}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={20} className="ml-2" />
              <span>{event.eventLocation}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users size={20} className="ml-2" />
              <span>{event.confirmedGuests} מתוך {event.totalGuests} אישרו הגעה</span>
            </div>
          </div>
        </div>
        {/* Guests List */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">רשימת מוזמנים</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-4">שם</th>
                  <th className="text-right py-2 px-4">טלפון</th>
                  <th className="text-right py-2 px-4">סטטוס</th>
                  <th className="text-right py-2 px-4">הגעה בפועל</th>
                </tr>
              </thead>
              <tbody>
                {guests?.map((guest) => (
                  <tr key={guest._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{guest.name}</td>
                    <td className="py-2 px-4">{guest.phone}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${guest.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        guest.status === 'declined' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {guest.status === 'confirmed' ? 'מגיע' :
                          guest.status === 'declined' ? 'לא מגיע' :
                            'טרם אישר'}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {guest.attended ?
                        <span className="text-green-600">✓ הגיע</span> :
                        <span className="text-gray-400">-</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;