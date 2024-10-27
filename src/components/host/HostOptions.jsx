import { isTokenPresent } from "../../../authUtils";
import React, {useEffect } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import "../../../src/cssS/HostOptions.css";

function HostOptions() {
  const location = useLocation();
  const hostName = location.state?.hostName;
  const hostId = location.state?.hostId || null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isTokenPresent()) {
      setIsTokenValid(false);
      setErrorMessage("אין טוקן זמין. אנא התחבר מחדש.");
    }
  }, []);
  const handleViewEvents = () => {
    
    navigate("/view-events");
  };

  const handleCreateEvent = () => {
    navigate("/create-event", { state: { hostId: hostId, hostName: hostName} });
  };

  return (
    <div className="HostOptions-container">
      <h1 className="HostOptions-title">ברוך הבא {hostName}</h1>
      <div className="HostOptions-buttons">
        <button onClick={handleViewEvents} className="HostOptions-button">
          הצג אירועים
        </button>
        <button onClick={handleCreateEvent} className="HostOptions-button">
          צור אירוע
        </button>
      </div>
    </div>
  );
}

export default HostOptions;
