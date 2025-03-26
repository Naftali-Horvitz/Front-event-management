import React, { createContext, useContext, useState } from 'react';
import { getCurrentUser } from '../utils/authUtils';

// יצירת הקונטקסט
export const EventContext = createContext(null);

// הוק לשימוש בקונטקסט
export const useEventContext = () => useContext(EventContext);

// קומפוננט פרובידר
export const EventContextProvider = ({ children }) => {
  // שימוש ב-useState עם אובייקט של נתוני האירוע
  const [hostName, setHostName] = useState(getCurrentUser().hostName);
  const [eventData, setEventData] = useState({
    eventId: '',
    eventName: '',
    eventLocation: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
  });
  
  // ערך הקונטקסט כולל את הנתונים ופונקציית העדכון
  const contextValue = {
    hostName,
    setHostName,
    eventData,
    updateEventData: (newData) => {
      setEventData(prevData => ({
        ...prevData,
        ...newData
      }));
    },
    resetEventData: () => {
      setEventData({
        eventId: '',
        eventName: '',
        eventLocation: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
      });
    }
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};