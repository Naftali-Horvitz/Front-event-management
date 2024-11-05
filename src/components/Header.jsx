import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssS/Header.css";
import "../../src/index.css";
import BackButton from "../components/features/BackButton";
import logo from "../fotos/logo.jpg";
import logoSvg from "../fotos/logo.svg";
import { Menu, X } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { getCurrentUser, validateToken, initializeActivityListener, clearAllUserData, isTokenPresent } from '../utils/authUtils';

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(isTokenPresent()));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { hostName } = getCurrentUser();

  useEffect(() => {
    initializeActivityListener();

    const checkAuthStatus = () => {
      const isValid = validateToken();
      setIsLoggedIn(isValid);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuthStatus();

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="תפריט"
        >
          <Menu className="h-6 w-6" />
        </button>

        <nav className="navbar">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">דף הבית</Link></li>
            <li><Link to="/aboutPage" className="nav-link">אודות</Link></li>
            <li><Link to="/ContactPage" className="nav-link">צור קשר</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <FaUserCircle
            className="text-3xl md:text-3xl text-2xl text-gray-700 hover:text-blue-500 cursor-pointer transition"
            onClick={navigateToPersonalArea}
          />
          <div className="flex flex-col -space-y-4">
            <button
              className="text-sm md:text-base text-gray-700 hover:text-blue-500 cursor-pointer transition"
              onClick={navigateToPersonalArea}
            >
              {isLoggedIn ? `ברוכים הבאים ${hostName}` : 'היכנס או הירשם'}
            </button>
            {isLoggedIn && (
              <button
                className="text-xs md:text-xs text-gray-500 hover:text-blue-500 cursor-pointer transition"
                onClick={handleLogout}
              >
                <br />
                להתנתקות לחץ כאן
              </button>
            )}
          </div>
        </div>
        {BackButton()}

        <div className="logoSvg">
          <Link to="/" className="nav-link">
            <img src={logoSvg} alt="לוגו" className="logo-svg" />
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu} />
      <nav className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <button
          className="mobile-menu-close"
          onClick={closeMobileMenu}
          aria-label="סגור תפריט"
        >
          <X className="h-6 w-6" />
        </button>

        <ul className="nav-list">
          <li><Link to="/" className="nav-link" onClick={closeMobileMenu}>דף הבית</Link></li>
          <li><Link to="/aboutPage" className="nav-link" onClick={closeMobileMenu}>אודות</Link></li>
          <li><Link to="/ContactPage" className="nav-link" onClick={closeMobileMenu}>צור קשר</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;