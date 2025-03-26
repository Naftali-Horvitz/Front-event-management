import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import config from "../../../src/config";
import { validateField, validateForm } from "../../utils/validation";
import { setNewUserData, isTokenPresent } from "../../utils/authUtils";
import { useEventContext } from "../../context/EventDataContext";
import { useAuth } from "../../context/AuthContext";

const SignupForm = () => {

  const { setIsAuthenticated } = useAuth();
  const { setHostName } = useEventContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    phone: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    userId: "",
    phone: "",
    password: "",
    email: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const port = config.backendUrl;
  useEffect(() => {
    if (isTokenPresent()) {
      navigate("/");
    }
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // ולידציה בזמן אמת
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ולידציה לפני שליחה
    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    setIsRegistering(true);
    try {
      const response = await axios.post(`${port}/user/register`, formData);
      setNewUserData(
        response.data.token,
        response.data.user.fullName,
        response.data.user._id
      );
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.token);
      setHostName(response.data.user.fullName);
      setMessage("ההרשמה הצליחה!");
      navigate("/hostOptions");
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("שגיאה ברישום. נסה שוב מאוחר יותר.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const renderField = (name, label, type = "text") => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        className={`w-full px-4 py-3 rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-200'
          } bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none`}
      />
      {errors[name] && (
        <div className="text-red-500 text-sm mt-1 animate-fadeInUp">
          {errors[name]}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-100/10 to-blue-500/10 -top-24 -right-24 animate-float"></div>
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-blue-100/10 to-blue-500/10 -bottom-12 -left-12 animate-float-delay-2"></div>
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-blue-100/10 to-blue-500/10 top-1/2 right-1/4 animate-float-delay-4"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-lg space-y-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            הרשמה לאתר
          </h1>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 space-y-6 border border-white/20 animate-fadeInUp transition-transform hover:translate-y-[-2px]">
            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              <div className="space-y-4">
                {renderField("fullName", "שם פרטי ומשפחה")}
                {renderField("phone", "פלאפון")}
                {renderField("userId", "תעודת זהות")}
                {renderField("email", "מייל", "email")}
                {renderField("password", "סיסמא", "password")}
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium 
                         hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0
                         transition-all duration-300 relative overflow-hidden"
              >
                {isRegistering ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin ml-2" size={20} />
                    <span>מבצע הרשמה...</span>
                  </div>
                ) : (
                  "הירשם"
                )}
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-full opacity-0 hover:scale-100 hover:opacity-100 transition-all duration-500 transform origin-center"></div>
              </button>
            </form>

            {message && (
              <div className={`text-center text-sm animate-fadeInUp ${message === "ההרשמה הצליחה!"
                ? "text-green-600"
                : "text-red-600"
                }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

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

        .animate-float { animation: float 20s infinite; }
        .animate-float-delay-2 { animation: float 20s infinite -5s; }
        .animate-float-delay-4 { animation: float 20s infinite -10s; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out; }
      `}</style>
    </div>
  );
};

export default SignupForm;