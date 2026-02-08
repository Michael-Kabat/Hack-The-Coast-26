// App.jsx
import React from "react";
import "../App.css";
import logo from "../save-the-planet.png"; // Make sure the image is in the src folder or adjust path

function LandingPage() {
  return (
    <div className="container">
      
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="heading">
        <h1>Protect the Coast</h1>
      </div>

      <p className="description">
        Complete 1 daily sustainability mission and track your impact.
      </p>

      <div className="buttons">
        <button className="btn secondary">Sign up</button>
        <button className="btn secondary">Log in</button>
        <button className="btn primary">Play</button>
      </div>

      <div className="footer">
        <p>February 7, 2026</p>
        <p>12,345 challenges completed worldwide</p>
      </div>
    </div>
  );
}

export default LandingPage;
