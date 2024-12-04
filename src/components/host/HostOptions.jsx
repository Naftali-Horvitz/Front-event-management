import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, PlusCircle, User } from "lucide-react";
import {validateToken, isTokenPresent, getCurrentUser, clearAllUserData } from "../../utils/authUtils";

const HostOptions = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  
  const { hostName, hostId } = getCurrentUser();

  useEffect(() => {
    if (!validateToken()) {
      setErrorMessage("אין הרשאת גישה. מעביר לדף ההתחברות...");
      clearAllUserData();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate]);
  
  const handleViewEvents = () => {
    if (!isTokenPresent()) {
      setErrorMessage("אין הרשאת גישה. מעביר לדף ההתחברות...");
      setTimeout(() => {
        navigate("/loginhost");
      }, 2000);
      return;
    }
    navigate("/view-events");
  };

  const handleCreateEvent = () => {
    if (!isTokenPresent()) {
      setErrorMessage("אין הרשאת גישה. מעביר לדף ההתחברות...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    }
    navigate("/create-event");
  };

  if (!hostName || !hostId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <p className="text-gray-600">אין גישה למידע. אנא התחבר מחדש.</p>
        </div>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto space-y-8">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center animate-fadeInUp">
              {errorMessage}
            </div>
          )}

          <div className="text-center space-y-4 animate-fadeInUp">
            <div className="inline-block p-2 bg-white/50 backdrop-blur-sm rounded-full mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
              ברוך הבא {hostName}
            </h1>
            <p className="text-gray-600">מה תרצה לעשות היום?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8" dir="rtl">
            {/* View Events Card */}
            <button
              onClick={handleViewEvents}
              className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 
                       transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl
                       relative overflow-hidden animate-fadeInUp"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="p-3 bg-blue-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">הצג אירועים</h3>
                <p className="text-gray-600 text-center text-sm">צפה ברשימת האירועים שלך וערוך אותם</p>
              </div>
            </button>

            {/* Create Event Card */}
            <button
              onClick={handleCreateEvent}
              className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 
                       transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl
                       relative overflow-hidden animate-fadeInUp animation-delay-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="p-3 bg-purple-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <PlusCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">צור אירוע</h3>
                <p className="text-gray-600 text-center text-sm">צור אירוע חדש והתחל להזמין אורחים</p>
              </div>
            </button>
          </div>
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
        .animation-delay-200 { animation-delay: 200ms; }
      `}</style>
    </div>
  );
};

export default HostOptions;