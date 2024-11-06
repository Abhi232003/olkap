import { useState } from 'react';
import instagramLogo from './assets/instagram.svg'
import linkedinLogo from './assets/linkedin.svg'
import logo from './assets/logo.svg';
import './App.css';
import MouseTrail from './MouseTrail';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MouseTrail />

      <div className="app-background">
        {/* Empty background */}
      </div>

      <div className="centered-logo">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>

      <div className="main-content">
        <h1>ACCENTS · OBJECTS · LIFESTYLE</h1>
        <p>We are crafting something special. Till then connect to us through our socials.</p>

        <div className="footer">
          <div className="social-link">
            <img src={instagramLogo} alt="Instagram Logo" className="social-icon" />
            <span>Instagram</span>
          </div>
          <span className="address-text">Tower 1, City Point, Boat Club Rd, Pune - 411001</span>
          <div className="social-link">
            <img src={linkedinLogo} alt="LinkedIn Logo" className="social-icon" />
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
