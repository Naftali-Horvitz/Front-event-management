import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { Calendar, MapPin, User, FileText } from "lucide-react";
import config from "../../config.js";
import { getCurrentUser } from '../../utils/authUtils';

const SuccessMessage = () => {

  const { hostName } = getCurrentUser();

  const location = useLocation();
  const {
    eventId,
    eventName,
    eventLocation,
    eventDate,
    eventDescription,
  } = location.state || {};

  const [copySuccess, setCopySuccess] = useState("");
  const [shareOptionsVisible, setShareOptionsVisible] = useState(false);

  const port = config.backendUrl;
  const registrationUrl = `https://test-7ft1.onrender.com/guest/${eventId}`;
  const registrationUrlLocal = `http://localhost:3000/guest/${eventId}`;

  const messageHtml = `
    <h2>הזמנה לאירוע</h2>
    <p>אנו שמחים להזמינך:</p>
    <p>ל${eventName}</p>
    <p>${eventDescription}</p>
    <p><strong>האירוע יתקיים ב</strong> ${eventLocation}</p>
    <p><strong>בתאריך</strong> ${eventDate}</p>
    <p><strong>נא הבטיחו מקומכם איתנו</strong></p>
    <p><strong>מצפים לכם ${hostName}</strong></p>
    <p><a href="${registrationUrl}">הירשם כאן</a></p>
  `;

  const textToShare = `
    הזמנה לאירוע
    אנו שמחים להזמינך:
    ל${eventName}
    ${eventDescription}
    האירוע יתקיים ב${eventLocation}
    בתאריך ${eventDate}
    נא הבטיחו מקומכם איתנו
    מצפים לכם ${hostName}
    הירשם כאן: ${registrationUrl}
  `;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToShare);
      setCopySuccess("ההודעה הועתקה!");
      setTimeout(() => setCopySuccess(""), 3000);
    } catch (err) {
      console.error("שגיאה בהעתקה: ", err);
    }
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaEmail = () => {
    const emailSubject = encodeURIComponent(`הזמנה לאירוע: ${eventName}`);
    const emailBody = encodeURIComponent(messageHtml);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 animate-fadeInUp" dir="rtl">
            {/* Success Icon and Message */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-600 mb-2">האירוע נוצר בהצלחה!</h1>
              <p className="text-gray-600">אתה יכול לשתף את ההזמנה עם האורחים שלך</p>
            </div>

            {/* Event Details Card */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-xl text-gray-800">{eventName}</h2>
                  <p className="text-gray-600">{eventDescription}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{eventLocation}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{eventDate}</span>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">מארח: {hostName}</span>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <button
                  onClick={shareViaWhatsApp}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  שתף בוואטסאפ
                </button>
                <button
                  onClick={shareViaEmail}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <MdEmail className="w-5 h-5" />
                  שתף באימייל
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <MdContentCopy className="w-5 h-5" />
                  העתק קישור
                </button>
              </div>
              {copySuccess && (
                <div className="text-center text-green-600 animate-fadeIn">
                  {copySuccess}
                </div>
              )}
            </div>
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-float { animation: float 20s infinite; }
        .animate-float-delay-2 { animation: float 20s infinite -5s; }
        .animate-float-delay-4 { animation: float 20s infinite -10s; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default SuccessMessage;