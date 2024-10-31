import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssS/Header.css";
import "../../src/index.css";
import logo from "../fotos/logo.jpg";
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  // בדיקה ישירה של הטוקן בהתחלה
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  // האזנה לשינויים בטוקן
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(Boolean(token));
    };

    // בדיקה ראשונית
    checkAuthStatus();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // בדיקה תקופתית
    const interval = setInterval(checkAuthStatus, 500);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);
  const navigateToPersonalArea = () => {
    if (isLoggedIn) {
      localStorage.clear();             // מוחק את כל המידע מהלוקל סטורג'
      navigate('/');
    } else {
      navigate('/host');
    }
  };
  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">דף הבית</Link></li>
          <li className="nav-item"><Link to="/aboutPage" className="nav-link">אודות</Link></li>
          <li className="nav-item"><Link to="/ContactPage" className="nav-link">צור קשר</Link></li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <FaUserCircle
          className="text-3xl text-gray-700 hover:text-blue-500 cursor-pointer transition"
          onClick={navigateToPersonalArea}
        />
        <button
          className="text-1xl text-gray-700 hover:text-blue-500 cursor-pointer transition"
          onClick={navigateToPersonalArea}>{isLoggedIn ? 'התנתק' : 'היכנס או הירשם כדי להתחבר'}</button>
      </div>
      <div className="logo">
        <img src={logo} alt="לוגו" className="logo-img" />
      </div>
    </header>
  );
}

export default Header;