import React, { useEffect } from "react";
import StyledLink from "../StyledLink";
import '../../../src/cssS/Host.css';

function Host() {
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.setProperty('--x', `${x}%`);
      particle.style.setProperty('--y', `${y}%`);
    });
  }, []);

  return (
    <div className="host-container">
      <div className="host-content">
        <h1 className="host-title">ברוכים הבאים, מארחים!</h1>
        <p className="host-description">
          אנחנו שמחים לארח אתכם באפליקציה שלנו. כאן תוכלו ליצור ולנהל אירועים בקלות ובנוחות.
        </p>
        <div className="host-buttons">
          <StyledLink className="host-link" id="signuphost" to="/signuphost">
            הרשמה
          </StyledLink>
          <StyledLink className="host-link" id="loginhost" to="/loginhost">
            התחבר
          </StyledLink>
        </div>
      </div>
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
    </div>
  );
}

export default Host;