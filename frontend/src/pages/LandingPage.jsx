// App.jsx
import React from "react";
import "../App.css";
import logo from "../save-the-planet.png"; // Make sure the image is in the src folder or adjust path
import SignIn from "../components/SignIn"; // adjust path if needed
import { useNavigate } from "react-router-dom"; // 🔹 needed for navigation

export default function LandingPage() {
  const navigate = useNavigate(); // 🔹 get navigate function

  const goToSignIn = () => {
    navigate("/signin"); // 🔹 routes to SignIn page
  };

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

      <div className="button">
        {/* 🔹 Play button navigates to SignIn */}
        <button className="btn primary" onClick={goToSignIn}>
          Play
        </button>
      </div>

      <div className="footer">
        <p>February 7, 2026</p>
        <p>12,345 challenges completed worldwide</p>
      </div>
    </div>
  );
}
