// InvitationPreview.jsx
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { templates } from "./constants";

const InvitationPreview = ({
  customStyle,
  customImage,
  selectedTemplate,
  selectedEmojis,
  setSelectedEmojis,
  customMessage,
  eventName,
  eventDescription,
  eventDate,
  eventLocation,
  hostName,
  isCustomizing
}) => {
  return (
    <div className={`${isCustomizing ? "md:col-start-2" : "md:col-span-2"}`}>
      <div
        className="rounded-2xl shadow-lg p-8 animate-fadeInUp"
        style={{
          backgroundColor: customStyle.backgroundColor,
          color: customStyle.textColor,
          fontFamily: customStyle.fontFamily,
        }}
      >
        {/* Custom Image */}
        {customImage && (
          <div className="mb-6 text-center">
            <img
              src={customImage}
              alt="תמונה מותאמת אישית"
              className="max-h-60 rounded-lg mx-auto"
            />
          </div>
        )}

        {/* Event Details */}
        <div 
          className="text-center space-y-8 relative" 
          dir="rtl"
          style={{
            padding: templates.find(t => t.id === selectedTemplate)?.style.padding || "2rem"
          }}
        >
          {/* Title Section */}
          <div className="space-y-4">
            <h1 
              className="font-bold leading-tight"
              style={{ 
                fontSize: templates.find(t => t.id === selectedTemplate)?.style.titleSize || "3rem",
                color: customStyle.accentColor
              }}
            >
              {customMessage.title}
            </h1>
            {selectedEmojis.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {selectedEmojis.map((emoji, index) => (
                  <span 
                    key={index} 
                    className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                      const newEmojis = [...selectedEmojis];
                      newEmojis.splice(index, 1);
                      setSelectedEmojis(newEmojis);
                    }}
                    title="לחץ למחיקה"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            <p 
              className="font-medium"
              style={{ 
                fontSize: templates.find(t => t.id === selectedTemplate)?.style.subtitleSize || "1.5rem"
              }}
            >
              {customMessage.subtitle}
            </p>
          </div>
          
          {/* Event Details Section */}
          <div className="space-y-6 py-8">
            <h2 
              className="text-3xl font-bold"
              style={{ color: customStyle.accentColor }}
            >
              {eventName}
            </h2>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto">
              {eventDescription}
            </p>
            
            <div className="flex flex-col items-center gap-6 mt-8">
              <div 
                className="flex items-center gap-3 text-xl p-3 rounded-full"
                style={{ backgroundColor: `${customStyle.accentColor}20` }}
              >
                <Calendar className="w-6 h-6" style={{ color: customStyle.accentColor }} />
                <span className="font-medium">{eventDate}</span>
              </div>
              
              <div 
                className="flex items-center gap-3 text-xl p-3 rounded-full"
                style={{ backgroundColor: `${customStyle.accentColor}20` }}
              >
                <MapPin className="w-6 h-6" style={{ color: customStyle.accentColor }} />
                <span className="font-medium">{eventLocation}</span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4 pt-6 border-t" style={{ borderColor: `${customStyle.accentColor}30` }}>
            <p className="text-2xl">{customMessage.footer}</p>
            <p 
              className="font-bold text-xl"
              style={{ color: customStyle.accentColor }}
            >
              בברכה, {hostName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationPreview;