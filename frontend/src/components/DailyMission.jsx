import { useEffect, useState } from "react";
import { getDailyPrompt } from "../api/prompts";

export default function DailyMission({
  onComplete,
  completedToday,
  prompt: initialPrompt,
}) {
  const [dailyPrompt, setDailyPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(!initialPrompt);
  const [error, setError] = useState(null);

  /* --------------------
     Fetch latest prompt
  -------------------- */
  const fetchLatestPrompt = async () => {
    try {
      setLoading(true);
      const res = await getDailyPrompt();
      setDailyPrompt(res.data.prompt ?? res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch daily prompt:", err);
      setError("Unable to load today’s challenge.");
    } finally {
      setLoading(false);
    }
  };

  /* Initial mount */
  useEffect(() => {
    if (!initialPrompt) {
      fetchLatestPrompt();
    }
  }, [initialPrompt]);

  /* Refetch when tab regains focus (midnight-safe) */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchLatestPrompt();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  /* --------------------
     Render guards
  -------------------- */
  if (loading) {
    return <p>Loading today’s challenge…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!dailyPrompt) {
    return <p>No challenge available.</p>;
  }

  /* --------------------
     Render
  -------------------- */
  return (
    <div className="challenge-card">
      <p className="date">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      <h2>Today’s Challenge</h2>

      <p className="description">
        {dailyPrompt.prompt ?? dailyPrompt}
      </p>

      {dailyPrompt.co2_kg !== undefined && (
        <div className="impact">
          <strong>Impact</strong>
          <ul>
            <li>🌿 CO₂ saved: {dailyPrompt.co2_kg} kg</li>
            <li>💧 Water saved: {dailyPrompt.water_liters} L</li>
            <li>🗑 Waste reduced: {dailyPrompt.waste_kg} kg</li>
            <li>⭐ Points: {dailyPrompt.points}</li>
          </ul>
        </div>
      )}

      <button onClick={onComplete} disabled={completedToday}>
        {completedToday ? "Completed" : "Mark Complete"}
      </button>
    </div>
  );
}
