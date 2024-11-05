import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssS/Header.css";
import "../../src/index.css";
import BackButton from "../components/features/BackButton";
import logo from "../fotos/logo.jpg";
import logoSvg from "../fotos/logo.svg";
import { ArrowRight } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { getCurrentUser, validateToken, initializeActivityListener, clearAllUserData, isTokenPresent } from '../utils/authUtils';

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(isTokenPresent()));
  const { hostName } = getCurrentUser();

  useEffect(() => {
    // מפעיל את המעקב אחר פעילות המשתמש
    initializeActivityListener();

    const checkAuthStatus = () => {
      // בודק את תקינות הטוקן (כולל בדיקת timeout של 5 דקות)
      const isValid = validateToken();
      setIsLoggedIn(isValid);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // הפעלת הבדיקות
    window.addEventListener("scroll", handleScroll);
    checkAuthStatus(); // בדיקה ראשונית

    // בדיקה תקופתית כל 30 שניות
    const interval = setInterval(checkAuthStatus, 30000);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [navigate, isLoggedIn]);

  const handleLogout = () => {
    clearAllUserData();
    navigate('/');
    setIsLoggedIn(false);
  };

  const navigateToPersonalArea = () => {
    if (isLoggedIn) {
      navigate('/hostOptions');
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
        <div className="flex flex-col -space-y-4">
          <button
            className="text-1xl text-gray-700 hover:text-blue-500 cursor-pointer transition"
            onClick={navigateToPersonalArea}
          >
            {isLoggedIn ? (
              `ברוכים הבאים ${hostName}`
            ) : (
              'היכנס או הירשם כדי להתחבר'
            )}
          </button>
          {isLoggedIn && (
            <button className="text-xs text-gray-500  hover:text-blue-500 cursor-pointer transition"
              onClick={handleLogout}><br />להתנתקות לחץ כאן
            </button>
          )}
        </div>
      </div>
      {BackButton()}
      {/* <div className="logo">
        <Link to="/" className="nav-link">
          <img src={logo} alt="לוגו" className="logo-img" />
        </Link>
      </div> */}
      <div className="logoSvg">
        <Link to="/" className="nav-link">
          <img src={logoSvg} alt="לוגו" className="logo-svg" />
        </Link>
      </div>
    </header>
  );
}

export default Header;