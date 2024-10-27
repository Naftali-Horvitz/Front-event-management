import { isTokenPresent } from "../../../authUtils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../src/cssS/CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreating, setIsCreating] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    hostId: location.state?.hostId || "",
  });
  const hostName = location.state?.hostName || "";
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const port = (process.env.PORT) || 5000;

  useEffect(() => {
    if (!isTokenPresent()) {
      setIsTokenValid(false);
      setErrorMessage("אין טוקן זמין. אנא התחבר מחדש.");
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

    // בדיקת טוקן בעת שליחת הטופס
    if (!isTokenPresent()) {
      setIsTokenValid(false);
      setErrorMessage("אין טוקן זמין או שהוא פג תוקף. אנא התחבר מחדש.");
      setIsCreating(false);
      return;
    }

    try {
      const response = await axios.post(
        `${port}/guest/events/create-event`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const eventId = response.data.eventId;
      setSuccessMessage("האירוע נוצר בהצלחה!");
      setTimeout(() => {
        navigate("/success-message", {
          state: {
            hostName: hostName,
            eventId: eventId,
            eventName: formData.eventName,
            eventDescription: formData.eventDescription,
            eventLocation: formData.eventLocation,
            eventDate: formData.eventDate,
          },
        });
      }, 1000); // המתן 5 שניות לפני הניווט
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("שגיאה ביצירת האירוע. אנא נסה שוב מאוחר יותר.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="CreateEvent-container">
      {successMessage ? (
        <p className="success-message">{successMessage}</p>
      ) : (
        <div className="CreateEvent-form">
          <h1 className="CreateEvent-title">יצירת אירוע</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">שם האירוע</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                placeholder="הכנס את שם האירוע"
                value={formData.eventName}
                onChange={handleChange}
                required
                className="CreateEvent-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">תאריך האירוע</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="CreateEvent-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventLocation">מיקום האירוע</label>
              <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                placeholder="הכנס את מיקום האירוע"
                value={formData.eventLocation}
                onChange={handleChange}
                required
                className="CreateEvent-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDescription">תיאור האירוע</label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="הכנס את תיאור האירוע"
                value={formData.eventDescription}
                onChange={handleChange}
                required
                className="CreateEvent-textarea"
              ></textarea>
            </div>
            <button
              type="submit"
              className="CreateEvent-button"
              disabled={isCreating}
            >
              {isCreating ? "בתהליך..." : "צור אירוע "}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateEvent;
