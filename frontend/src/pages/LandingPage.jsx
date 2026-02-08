import { useNavigate } from "react-router-dom";
import "./landing.css";
import logo from "../save-the-planet.png";

export default function LandingPage({ totalChallenges }) {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/signin");
  };

  // Dynamically get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="landing-card">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="heading">
        <h1>Protect the Coast</h1>
      </div>

      <p className="description">
        Complete 1 daily sustainability mission and track your impact.
      </p>

      <button className="btn primary" onClick={goToSignIn}>
        Play
      </button>

      <div className="footer">
        <span>{formattedDate}</span>
        <span>{totalChallenges?.toLocaleString() || "365"} challenges completed worldwide</span>
      </div>
    </div>
  );
}
