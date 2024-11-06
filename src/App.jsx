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
      
      <div className="main-content">
      <h1 className="heading">ACCENTS ‧ OBJECTS ‧ LIFESTYLE</h1>
        <img src={logo} alt="Company Logo" className="logo" />
        <p className="special-text">We are crafting something special. <br></br>Till then connect to us through our socials.</p>
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
