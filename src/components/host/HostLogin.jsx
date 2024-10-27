import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../src/cssS/HostLogin.css";

function HostLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    );
  };
  const port = (process.env.REACT_APP_BACKEND_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!validateEmail(formData.email)) {
      setMessage("כתובת אימייל לא תקינה");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${port}/user/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      setMessage("התחברת בהצלחה");
      const user = response.data.user.userId;
      const hostName = response.data.user.fullName;
      navigate("/hostOptions", {
        state: { hostId: user, hostName: hostName},
      });
      console.log("hostName:", hostName);
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("שגיאה ברישום. נסה שוב מאוחר יותר.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">התחברות</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="סיסמא"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <br />
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "מתחבר..." : "היכנס"}
        </button>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
}

export default HostLogin;
