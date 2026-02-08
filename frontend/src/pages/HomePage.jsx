import { useState, useEffect } from "react";
import "./hp.css"; // our merged CSS file

const challenges = [
  {
    id: "1",
    title: "Beach Cleanup",
    description: "Pick up 10 pieces of trash at your nearest beach or waterfront",
    impact: "Prevents ocean pollution and protects marine life",
  },
  {
    id: "2",
    title: "Zero Plastic Day",
    description: "Go an entire day without using any single-use plastic",
    impact: "Reduces plastic waste by approximately 100g per person",
  },
  {
    id: "3",
    title: "Community Composting",
    description: "Start or contribute to a compost bin with your food scraps",
    impact: "Diverts organic waste from landfills, reducing methane emissions",
  },
  {
    id: "4",
    title: "Reusable Revolution",
    description: "Bring your own bags, containers, and utensils for all purchases today",
    impact: "Eliminates up to 5 disposable items from waste stream",
  },
  {
    id: "5",
    title: "Clothing Swap",
    description: "Organize or attend a clothing swap instead of buying new items",
    impact: "Saves water, reduces textile waste, extends garment lifecycle",
  },
  {
    id: "6",
    title: "E-Waste Drop-off",
    description: "Properly recycle old electronics at a certified e-waste facility",
    impact: "Prevents toxic materials from entering landfills",
  },
  {
    id: "7",
    title: "Meatless Monday",
    description: "Skip meat for the entire day and choose plant-based meals",
    impact: "Reduces carbon footprint by approximately 2.5kg CO2",
  },
];

function getDailyChallengeIndex() {
  const today = new Date();
  const startDate = new Date("2024-01-01");
  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSinceStart % challenges.length;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState("Today");
  const [completed, setCompleted] = useState(false);

  const todayChallenge = challenges[getDailyChallengeIndex()];

  const handleComplete = () => setCompleted(true);

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>EcoChallenge</h1>
        <nav>
          {["Today", "Leaderboard", "Stats"].map((tab) => (
            <button
              key={tab}
              className={currentTab === tab ? "active" : ""}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Stats */}
      <div className="stats">
        <div>
          <h2>0</h2>
          <p>STREAK</p>
        </div>
        <div>
          <h2>{completed ? 1 : 0}</h2>
          <p>COMPLETED</p>
        </div>
        <div>
          <h2>0</h2>
          <p>BEST</p>
        </div>
      </div>

      {/* Main */}
      {currentTab === "Today" && (
        <main>
          <div className="challenge-card">
            <p className="date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2>{todayChallenge.title}</h2>
            <p className="description">{todayChallenge.description}</p>
            <div className="impact">
              <strong>Impact:</strong> {todayChallenge.impact}
            </div>
            <button onClick={handleComplete} disabled={completed}>
              {completed ? "Completed" : "Mark Complete"}
            </button>
          </div>
          <p className="global">
            {completed ? 1 : 0} challenges completed globally
          </p>
        </main>
      )}
    </div>
  );
}
