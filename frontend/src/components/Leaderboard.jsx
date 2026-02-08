import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Crown, Medal, ArrowLeft } from "lucide-react";
import { getLeaderboard } from "../api/users";
import "./Leaderboard.css";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await getLeaderboard();
        setUsers(res.data.topUsers);
        setTotals(res.data.globalTotals);
      } catch (err) {
        console.error(err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="leaderboard-page__loading">Loading…</div>;
  if (error) return <div className="leaderboard-page__error">{error}</div>;

  return (
    <div>
    <div className="leaderboard-page__container">
      <header className="leaderboard-page__header">
        <button
          className="leaderboard-page__back-btn"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft /> Back
        </button>
        <h1>Global Leaderboard</h1>
      </header>

      {totals && (
        <div className="leaderboard-page__totals-card">
          <h2>Global Impact 🌍</h2>
          <div className="leaderboard-page__totals-grid">
            <div>
              <strong>{totals.completed.toLocaleString()}</strong>
              <span>Challenges</span>
            </div>
            <div>
              <strong>{totals.co2.toLocaleString()}</strong>
              <span>CO₂ Saved (kg)</span>
            </div>
            <div>
              <strong>{totals.water.toLocaleString()}</strong>
              <span>Water Saved (L)</span>
            </div>
            <div>
              <strong>{totals.waste.toLocaleString()}</strong>
              <span>Waste Reduced (kg)</span>
            </div>
          </div>
        </div>
      )}

      <div className="leaderboard-page__users-list">
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            className="leaderboard-page__user-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="leaderboard-page__rank">
              {getRankIcon(index + 1) || `#${index + 1}`}
            </div>
            <div className="leaderboard-page__username">{user.username}</div>
            <div className="leaderboard-page__points">{user.points.toLocaleString()} pts</div>
            <div className="leaderboard-page__streak">🔥 {user.currentStreak} day streak</div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}

function getRankIcon(rank) {
  if (rank === 1) return <Crown className="leaderboard-page__icon-gold" />;
  if (rank === 2) return <Medal className="leaderboard-page__icon-silver" />;
  if (rank === 3) return <Medal className="leaderboard-page__icon-bronze" />;
  return null;
}
