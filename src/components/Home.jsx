import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../cssS/Home.css';
import TextHome from "./TextHome";
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


      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

    </div>
  );
}

export default Home;