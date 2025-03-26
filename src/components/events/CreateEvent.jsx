import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, MapPin, FileText, Tag } from "lucide-react";
import { validateToken, getCurrentUser } from "../../utils/authUtils.js";
import axios from "axios";
import config from "../../config.js";
import { useEventContext } from "../../context/EventDataContext";

function CreateEvent() {
  const { updateEventData } = useEventContext();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    hostId: getCurrentUser().hostId,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const port = config.backendUrl;

  useEffect(() => {
    if (!validateToken()) {
      setIsTokenValid(false);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateToken()) {
      setIsTokenValid(false);
      setErrorMessage("התחבר מחדש");
      setIsCreating(false);
      return;
    }

    try {
      const response = await axios.post(
        `${port}/events/create-event`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCurrentUser().token}`,
          },
        }
      );
      setSuccessMessage("האירוע נוצר בהצלחה!");
      const eventId = response.data.eventId;
      updateEventData({ eventId, ...formData });
      setTimeout(() => {
        navigate("/successMessage");
      }, 1000);
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("שגיאה ביצירת האירוע. אנא נסה שוב מאוחר יותר.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-200/20 -top-24 -right-24 animate-float"></div>
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-200/20 -bottom-12 -left-12 animate-float-delay-2"></div>
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-200/20 top-1/2 right-1/4 animate-float-delay-4"></div>
      </div>
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {successMessage ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center animate-fadeInUp">
              {successMessage}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 animate-fadeInUp">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-8">
                יצירת אירוע חדש
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                {/* Event Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Tag className="w-5 h-5 text-blue-600" />
                    שם האירוע
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="הכנס את שם האירוע"
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    תאריך האירוע
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Event time */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    זמן האירוע
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Event Location */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    מיקום האירוע
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="הכנס את מיקום האירוע"
                  />
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <FileText className="w-5 h-5 text-blue-600" />
                    תיאור האירוע
                  </label>
                  <textarea
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
                    placeholder="הכנס את תיאור האירוע"
                  />
                </div>
                {errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg
                           font-medium transition-all duration-300 hover:shadow-lg hover:opacity-90
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? "יוצר אירוע..." : "צור אירוע"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(0, 15px) rotate(0deg); }
          75% { transform: translate(-10px, -5px) rotate(-5deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float { animation: float 20s infinite; }
        .animate-float-delay-2 { animation: float 20s infinite -5s; }
        .animate-float-delay-4 { animation: float 20s infinite -10s; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out; }
      `}</style>
    </div>
  );
}

export default CreateEvent;