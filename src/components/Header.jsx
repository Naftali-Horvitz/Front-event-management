import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../cssS/Header.css";
import logo from "../fotos/logo.jpg";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">דף הבית</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">אודות</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">צור קשר</Link></li>
        </ul>
      </nav>
      <div className="logo">
        <img src={logo} alt="לוגו" className="logo-img" />
      </div>
    </header>
  );
}

export default Header;