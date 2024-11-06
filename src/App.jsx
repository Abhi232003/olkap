import { useState } from 'react'
import reactLogo from './assets/react.svg'
import logo from './assets/logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-background">
        {/* Empty background */}
      </div>
      
      <div className="main-content">
        <h1>ACCENTS OBJECTS LIFESTYLE</h1>
        <img src={logo} alt="Company Logo" className="logo" />
        <p>We are crafting something special. Till then connect to us through our socials.</p>
        
        <div className="footer">
          <span>Instagram</span>
          <span>Tower 1, City Point, Boat Club Rd, Pune - 411001</span>
          <span>LinkedIn</span>
        </div>
      </div>
    </>
  )
}

export default App
