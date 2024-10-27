import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../src/cssS/Guest.css";

function GuestForm() {
  const port = (process.env.PORT) || 5000;
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    guestId: "",
    email: "",
    phone: "",
    eventId: eventId,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${port}${eventId}`,
        formData
      );
      if (response.status === 200) {
        setMessage("ההרשמה בוצעה בהצלחה! קוד QR נשלח למייל שלך.");
        setIsRegistered(true);
      }
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg); // מציג הודעת שגיאה מהשרת
      } else {
        setMessage("שגיאה ברישום. נסה שוב מאוחר יותר.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    if (isRegistered) {
      return (
        <div className="container">
          <div className="form-card success-card">
            <h1 className="form-title">הרשמה הושלמה</h1>
            <p className="success-message">{message}</p>
            <div className="success-animation"></div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">הרשמה לאירוע</h1>
          <form onSubmit={handleSubmit} className="guest-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder=" "
              />
              <label className="form-label">שם</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="guestId"
                value={formData.guestId}
                onChange={handleChange}
                required
                className="form-input"
                placeholder=" "
              />
              <label className="form-label">תעודת זהות</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder=" "
              />
              <label className="form-label">מייל</label>
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
                placeholder=" "
              />
              <label className="form-label">פלאפון</label>
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <span>שלח</span>
              )}
            </button>
          </form>
          {message && !isRegistered && <p className="error-message">{message}</p>}
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="container">
        <div className="form-card success-card">
          <h1 className="form-title">הרשמה הושלמה</h1>
          <p className="success-message">{message}</p>
          <div className="success-animation"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="form-title">הרשמה לאירוע</h1>
        <form onSubmit={handleSubmit} className="guest-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">שם</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="guestId"
              value={formData.guestId}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">תעודת זהות</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">מייל</label>
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">פלאפון</label>
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <span>שלח</span>
            )}
          </button>
        </form>
        {message && !isRegistered && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default GuestForm;