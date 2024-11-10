import React, { useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import { Calendar, Users, Clock, Smartphone, CheckCircle, Layout } from 'lucide-react';
import '../../styles/components/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation classes to elements as they appear
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-page w-full min-h-screen overflow-x-hidden" dir="rtl">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="animation-circle circle-1"></div>
        <div className="animation-circle circle-2"></div>
        <div className="animation-circle circle-3"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-4 py-16 relative">
        {/* Hero Section */}
        <div className="hero-content text-center mb-16 animate-on-scroll">
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-6">
            ניהול אירועים בקליק
          </h1>
          <p className="hero-description text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            הפכו את ארגון האירועים שלכם לחוויה פשוטה ומהנה! בין אם מדובר במסיבת יום הולדת,
            כנס עסקי או אירוע משפחתי – הפלטפורמה שלנו מעניקה לכם את כל הכלים לניהול מושלם של כל אירוע.
          </p>
          <button onClick={() => navigate('/signuphost')} className="hero-button mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold">
            התחילו עכשיו
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Calendar className="w-12 h-12 text-blue-500" />}
            title="יצירת אירוע פשוטה"
            description="צרו אירוע חדש במספר צעדים פשוטים וקלים"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-blue-500" />}
            title="ניהול מוזמנים"
            description="שליחת הזמנות דיגיטליות ומעקב אחר אישורי הגעה"
          />
          <FeatureCard
            icon={<Clock className="w-12 h-12 text-blue-500" />}
            title="מעקב בזמן אמת"
            description="קבלו עדכונים שוטפים על סטטוס האירוע שלכם"
          />
        </div>

        {/* Benefits Section */}
        <div className="benefits-section bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">הכל במקום אחד</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <BenefitItem
              icon={<Smartphone className="w-6 h-6 text-blue-500" />}
              text="גישה מכל מכשיר, בכל זמן ומקום"
            />
            <BenefitItem
              icon={<CheckCircle className="w-6 h-6 text-blue-500" />}
              text="ממשק ידידותי וקל לשימוש"
            />
            <BenefitItem
              icon={<Layout className="w-6 h-6 text-blue-500" />}
              text="לוח שנה חכם לניהול האירועים"
            />
            <BenefitItem
              icon={<Users className="w-6 h-6 text-blue-500" />}
              text="שמירה על קשר רציף עם האורחים"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-on-scroll">
          <h2 className="hero-title text-2xl font-bold mb-4">צרו אירועים בסטייל</h2>
          <p className="text-gray-700 mb-8">
            התחילו עכשיו ליהנות מחוויית ניהול אירועים חדשנית ומתקדמת!
          </p>
          <button onClick={() => navigate('/signuphost')} className="hero-button bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold">
            הצטרפו עכשיו
          </button>
        </div>
      </div>
    </main>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card bg-white rounded-xl p-6 shadow-lg transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="feature-icon mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const BenefitItem = ({ icon, text }) => {
  return (
    <div className="benefit-item flex items-center gap-4">
      <div className="benefit-icon">{icon}</div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Home;