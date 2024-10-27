import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../cssS/Home.css';

function Home() {
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 15;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.animationDelay = `${delay}s`;
    });
  }, []);
  return (
    <div className="container">
      <div className="background-animation"></div>
      <div className="content">
        <h1 className="title">ברוכים הבאים</h1>
        <p className="welcome-text">
          בחרו את האפשרות המתאימה לכם
        </p>
        <div className="buttons">
          <Link className="styled-link" id="host" to="/host">
            מארח
          </Link>
          <Link className="styled-link" id="guest" to="/guest">
            אורח
          </Link>
        </div>
      </div>
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

    </div>
  );
}

export default Home;