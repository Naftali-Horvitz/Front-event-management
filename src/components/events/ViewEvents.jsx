import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Calendar, Users, Check, Clock } from 'lucide-react';
import config from "../../config.js";
import { validateToken, getCurrentUser } from "../../utils/authUtils.js";
import { getUserData } from "../../utils/storageUtils.js";

// // תצוגה מקדימה של כיצד הדף ייראה
// const previewData = [
//   {
//     _id: '1',
//     eventName: 'חתונה של דני ורותי',
//     date: '2024-12-20',
//     totalGuests: 250,
//     confirmedGuests: 180,
//     type: 'wedding'
//   },
//   {
//     _id: '2',
//     eventName: 'בר מצווה - יוסף כהן',
//     date: '2024-06-15',
//     totalGuests: 150,
//     confirmedGuests: 120,
//     type: 'bar_mitzvah'
//   },
//   {
//     _id: '3',
//     eventName: 'מסיבת אירוסין',
//     date: '2024-04-01',
//     totalGuests: 100,
//     confirmedGuests: 85,
//     type: 'engagement'
//   }
// ];

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const port = config.backendUrl;

  // חישוב סטטיסטיקות
  const stats = {
    totalEvents: events.length,
    activeEvents: events.filter(e => new Date(e.date) >= new Date()).length,
    totalGuests: events.reduce((acc, curr) => acc + curr.totalGuests, 0),

    // אחוז אישורים: (כמות נרשמים / כמות מוזמנים) * 100
    avgConfirmationRate: events.length > 0
      ? Math.round(
        (events.reduce((acc, curr) => {
          const rate = (curr.confirmedGuests / curr.totalGuests) * 100;
          return acc + (isNaN(rate) ? 0 : rate);
        }, 0) / events.length)
      )
      : 0,

    // אחוז הגעה בפועל: (כמות מגיעים בפועל / כמות נרשמים) * 100
    avgActualAttendance: (() => {
      const eventsWithAttendance = events.filter(e =>
        e.actualAttendees != null &&
        e.confirmedGuests != null &&
        e.confirmedGuests > 0
      );

      if (eventsWithAttendance.length === 0) return 0;

      const totalAttendanceRate = eventsWithAttendance.reduce((acc, curr) => {
        const rate = (curr.actualAttendees / curr.confirmedGuests) * 100;
        return acc + (isNaN(rate) ? 0 : rate);
      }, 0);

      return Math.round(totalAttendanceRate / eventsWithAttendance.length);
    })()
  };
  useEffect(() => {
    const checkAuthAndFetchEvents = async () => {
      if (!validateToken()) {
        navigate('/loginhost');
        return;
      }

      try {
        const response = await axios.get(`${port}/events/view-events`, {
          headers: { Authorization: `Bearer ${getCurrentUser().token}` }
        });
        setEvents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'שגיאה בטעינת האירועים');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchEvents();
  }, []);
  const handleEventClick = async (eventId) => {
    const idEvent = eventId;
    if (!validateToken()) {
      setIsTokenValid(false);
      return;
    }
    try {
      const response = await axios.get(`${port}/events/${idEvent}`, {
        headers: { Authorization: `Bearer ${getCurrentUser().token}` }
      });
      if (response.data) {
        console.log(response.data);
        navigate("/successMessage", {
          state: {
            // hostName: response.data.hostName,
            eventId: eventId,
            eventName: response.data.eventName,
            eventDescription: response.data.eventDescription,
            eventLocation: response.data.eventLocation,
            eventDate: response.data.eventDate,
          },
        });
      }
    } catch (error) {
      console.error(error);
      setError("שגיאה בטעינת האירוע.");
    } finally {
      setLoading(false);
    }
  };
  // פונקציה לחישוב סטטוס האירוע
  const getEventStatus = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    if (eventDate < today) return {
      text: 'הסתיים',
      color: 'bg-gray-200 text-gray-700',
      daysText: 'הסתיים לפני ' + Math.abs(daysUntilEvent) + ' ימים'
    };
    if (daysUntilEvent <= 7) return {
      text: 'קרוב',
      color: 'bg-yellow-100 text-yellow-800',
      daysText: 'בעוד ' + daysUntilEvent + ' ימים'
    };
    return {
      text: 'מתוכנן',
      color: 'bg-green-100 text-green-800',
      daysText: 'בעוד ' + daysUntilEvent + ' ימים'
    };
  };

  // קומפוננטת קארד סטטיסטיקה
  const StatCard = ({ icon: Icon, title, value, color = "blue" }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className={`flex items-center justify-between mb-2`}>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <Icon className={`text-${color}-500`} size={20} />
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  // קומפוננטת קארד אירוע
  const EventCard = ({ event }) => {
    const status = getEventStatus(event.date);
    const confirmationRate = Math.round((event.confirmedGuests / event.totalGuests) * 100) || 0;

    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">{event.eventName}</h3>
          <div className="flex flex-col items-end">
            <span className={`text-xs px-2 py-1 rounded-full ${status.color} mb-1`}>
              {status.text}
            </span>
            <span className="text-xs text-gray-500">{status.daysText}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="ml-2" />
            <span>{new Date(event.date).toLocaleDateString('he-IL')}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Users size={16} className="ml-2" />
            <span>{event.totalGuests} מוזמנים</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Check size={16} className="ml-2" />
            <span>{event.confirmedGuests} אישרו הגעה</span>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>אחוז אישורים</span>
              <span>{confirmationRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${confirmationRate > 75 ? 'bg-green-500' :
                  confirmationRate > 50 ? 'bg-blue-500' :
                    confirmationRate > 25 ? 'bg-yellow-500' :
                      'bg-red-500'
                  }`}
                style={{ width: `${confirmationRate}%` }}
              ></div>
            </div>
          </div>
          {/*Actual QR attendance rate bar*/}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>נוכחות בפועל </span>
              <span>{event.confirmedGuests}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${(event.actualAttendees / event.totalGuests) > 0.6 ? 'bg-green-500' :
                  (event.actualAttendees / event.totalGuests) > 0.4 ? 'bg-blue-500' :
                    (event.actualAttendees / event.totalGuests) > 0.2 ? 'bg-yellow-500' :
                      'bg-red-500'
                  }`}
                style={{ width: `${Math.round((event.actualAttendees / event.totalGuests) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/EventDetails/${event._id}`)}
            className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            צפה בפרטים
          </button>

          <div className="relative group">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
              onClick={() => handleEventClick(event._id)}
            >
              <Users size={16} />
              הזמן אורח
            </button>
          </div>
        </div>
      </div>
    );
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

  return (
    <div className="max-w-7xl mx-auto p-4 pt-16 mt-16" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">האירועים שלי</h1>
        <button
          onClick={() => navigate('/create-event')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          צור אירוע חדש
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-600">אין אירועים להצגה</h2>
          <p className="mt-2 text-gray-500">התחל ליצור את האירוע הראשון שלך</p>
        </div>
      ) : (
        <>
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Calendar} title="סה״כ אירועים" value={stats.totalEvents} />
            <StatCard icon={Clock} title="אירועים פעילים" value={stats.activeEvents} color="green" />
            <StatCard icon={Users} title="סה״כ מוזמנים" value={stats.totalGuests} color="purple" />
            <StatCard icon={Check} title="אחוז אישורים" value={`${stats.avgConfirmationRate}%`} color="yellow" />
            <StatCard icon={Users} title="ממוצע הגעה בפועל" value={`${stats.avgActualAttendance}%`} color="green" />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['הכל', 'פעילים', 'קרובים', 'הסתיימו'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-md ${filter === filterOption
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewEvents;