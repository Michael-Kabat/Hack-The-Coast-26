import { useNavigate } from "react-router-dom";
import "./home.css";


export default function HomePage({ user, dailyPrompt, onComplete }) {
    const navigate = useNavigate();

    if (!dailyPrompt) {dailyPrompt = "Error Getting Daily Prompt"}
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Protect the Coast</h1>
        <div className="home-actions">
<button className="btn-leaderboard" onClick={() => navigate("/stats")}>
          Global Contribution
        </button>
        <button className="btn-stats" onClick={() => navigate("/leaderboard")}>
          Global Leaderboard
        </button>
</div>
        
      </header>


      <main className="prompt-card">
        <p className="prompt-date">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>

        <div class= "challenge">
            <h2>Today's Challenge:</h2>
        </div>

        <h2 className="prompt-text">{dailyPrompt.prompt}</h2>


        <div class= "impact">
            <h2>your impact helped lower:</h2>
        </div>
        <div className="impact-section">
          <div className="impact-card">🌿 {dailyPrompt.co2_kg} kg CO₂</div>
          <div className="impact-card">💧 {dailyPrompt.water_liters} L water</div>
          <div className="impact-card">🗑 {dailyPrompt.waste_kg} kg waste</div>
        </div>

        <button
          className="btn-complete"
          disabled={user.completedToday}
          onClick={onComplete}
        >
          {user.completedToday ? "Thanks for helping the environment!" : "Mark Complete"}
        </button>
      </main>

      <section className="stats-section">
        {[
          { label: "Streak", value: user.currentStreak },
          { label: "Points", value: user.points },
          { label: "Completed", value: user.totalCompleted },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}


