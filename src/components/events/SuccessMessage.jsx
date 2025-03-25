import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FileUp } from "lucide-react";
import ShareInvitation from "./ShareInvitation";
import UploadGuestList from "./UploadGuestList";

const SuccessMessage = () => {

  const [shareInvitation, setShareInvitation] = useState(false);
  const [uploadingGuestList, setUploadingGuestList] = useState(false);

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
              <p className="text-gray-600">אתה יכול לשתף את ההזמנה עם האורחים שלך או <br />להעלות קובץ אקסל עם רשימת המוזמנים </p>
            </div>
            <div className="flex flex-row justify-center gap-4">
              <button
                onClick={() => {setShareInvitation(!shareInvitation), setUploadingGuestList(false)}}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
              >
                <FaShareAlt className="w-5 h-5" />
                שתף הזמנה
              </button>
              <button
                onClick={() => {setUploadingGuestList(!uploadingGuestList), setShareInvitation(false)}}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
              >
                <FileUp className="w-5 h-5" />
                העלאת רשימת מוזמנים
              </button>
            </div>
            {shareInvitation && (<ShareInvitation/>)}
            {uploadingGuestList && (<UploadGuestList/>)}
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
    </div >
  );
};

export default SuccessMessage;