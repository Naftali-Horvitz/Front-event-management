import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../src/cssS/SignupForm.css";
import config from "../../config.js";


const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    phone: "",
    password: "",
    email: "",
  });
  
  const hostName = formData.fullName.join("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const port = config.backendUrl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const response = await axios.post(
       `${port}/user/register`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      setMessage("ההרשמה הצליחה!");
      navigate("/hostOptions", {
        state: { hostName},
      }); // נווט לדף הצגת אירועים
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg); // מציג הודעת שגיאה מהשרת
      } else {
        setMessage("שגיאה ברישום. נסה שוב מאוחר יותר.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container">
      <h1>הרשמה לאתר</h1>
      <form onSubmit={handleSubmit} className="signupForm">
        <div>
          <label htmlFor="fullName">שם פרטי ומשפחה</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">פלאפון</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userId">תעודת זהות</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">מייל</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">סיסמא</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="register-button"
          disabled={isRegistering}
        >
          {isRegistering ? "בהרשמה..." : "הירשם"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
