// CustomizableInvitation.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomizationPanel from "./CustomizationPanel";
import InvitationPreview from "./InvitationPreview";
import { templates, defaultStyle } from "./constants";

const CustomizableInvitation = () => {
  const location = useLocation();
  const {
    eventId,
    eventName,
    eventLocation,
    eventDate,
    eventDescription,
    hostName,
  } = location.state || {};

  // Initialize all states with proper initial values
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [customStyle, setCustomStyle] = useState(() => ({
    ...defaultStyle,
    ...templates.find(t => t.id === "modern")?.style
  }));
  const [customImage, setCustomImage] = useState(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customMessage, setCustomMessage] = useState({
    title: "הזמנה לאירוע",
    subtitle: "אנו שמחים להזמינך",
    footer: "נשמח לראותכם",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-purple-100/20 to-blue-200/20 -top-24 -right-24 animate-float"></div>
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-200/20 -bottom-12 -left-12 animate-float-delay-2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Toggle Customization Mode */}
          <div className="text-center mb-6">
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              {isCustomizing ? "הצג תצוגה מקדימה" : "התאם אישית את ההזמנה"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customization Panel */}
            {isCustomizing && (
              <CustomizationPanel
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                customStyle={customStyle}
                setCustomStyle={setCustomStyle}
                customMessage={customMessage}
                setCustomMessage={setCustomMessage}
                customImage={customImage}
                setCustomImage={setCustomImage}
                selectedEmojis={selectedEmojis}
                setSelectedEmojis={setSelectedEmojis}
              />
            )}

            {/* Preview Panel */}
            <InvitationPreview
              customStyle={customStyle}
              customImage={customImage}
              selectedTemplate={selectedTemplate}
              selectedEmojis={selectedEmojis}
              setSelectedEmojis={setSelectedEmojis}
              customMessage={customMessage}
              eventName={eventName}
              eventDescription={eventDescription}
              eventDate={eventDate}
              eventLocation={eventLocation}
              hostName={hostName}
              isCustomizing={isCustomizing}
            />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: -2s;
        }

        .animate-fadeInRight { animation: fadeInRight 0.5s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default CustomizableInvitation;