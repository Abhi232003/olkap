import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import logo from './assets/logo.svg';
import logoT from './assets/logo2.svg';
import './App.css';
import MouseTrail from './MouseTrail';

function App() {
  return (
    <>
      <MouseTrail />

      <div className="app-background">
        {/* Empty background */}
      </div>

      <div className="centered-logo">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>

      <div className="logoT">
        <img src={logoT} alt="logoTop" className="logoT" />
      </div>

      <div className="main-content">
        <h1>ACCENTS · OBJECTS · LIFESTYLE</h1>
        <p>We are crafting something special. <br /> Till then connect with us through our socials.</p>
    
        <div className="footer">
          <a href="https://www.instagram.com/olkap.official/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            <span>Instagram</span>
          </a>
          <span className="address-text">Tower 1, City Point, Boat Club Rd, Pune - 411001</span>
          <a href="https://www.linkedin.com/company/olkapofficial/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
