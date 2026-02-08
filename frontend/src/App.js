import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { DailyMission } from "./components/DailyMission.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { UserStats } from "./components/UserStats.jsx";

// API helpers
import {
  loginUser,
  createUser,
  completeDaily,
  getDailyPrompt,
  getLeaderboard,
  getAllUsers,
} from "./api/users";

function App() {
  // 🔑 Single source of truth
  const [user, setUser] = useState(null);
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [aggregateImpact, setAggregateImpact] = useState({
    co2: 0,
    water: 0,
    waste: 0,
  });

  // 🔄 Restore session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Load daily prompt
  useEffect(() => {
    getDailyPrompt()
      .then((res) => setDailyPrompt(res.data.prompt))
      .catch((err) => console.error("Failed to load daily prompt:", err));
  }, []);

  // ✅ Load leaderboard
  useEffect(() => {
    getLeaderboard()
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error("Failed to load leaderboard:", err));
  }, []);

  // ✅ Compute aggregate impact
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        let co2 = 0,
          water = 0,
          waste = 0;
        res.data.forEach((u) => {
          co2 += u.impact?.co2 || 0;
          water += u.impact?.water || 0;
          waste += u.impact?.waste || 0;
        });
        setAggregateImpact({ co2, water, waste });
      })
      .catch((err) => console.error("Failed to fetch all users:", err));
  }, []);

  // ✅ Called after successful login/register
  const handleSignIn = async ({ email, password, username, isRegister }) => {
    try {
      let res;
      if (isRegister) {
        res = await createUser({ username, email, password });
      } else {
        res = await loginUser({ email, password });
      }
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  // ✅ Backend-controlled mission completion
  const handleMissionComplete = async () => {
    if (!user) return;

    try {
      const res = await completeDaily(user.id);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      // Refresh leaderboard and aggregate impact after completion
      getLeaderboard().then((res) => setLeaderboard(res.data));
      getAllUsers().then((res) => {
        let co2 = 0,
          water = 0,
          waste = 0;
        res.data.forEach((u) => {
          co2 += u.impact?.co2 || 0;
          water += u.impact?.water || 0;
          waste += u.impact?.waste || 0;
        });
        setAggregateImpact({ co2, water, waste });
      });
    } catch (err) {
      console.error("Failed to complete mission:", err);
    }
  };

  // 🚪 Not signed in
  if (!user) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-900">EcoQuest</h1>
        <p className="text-green-700">Welcome back, {user.username} 🌱</p>
      </header>

      {/* User Stats */}
      <UserStats
        totalPoints={user.points}
        streak={user.currentStreak}
        completedMissions={user.totalCompleted}
      />

      {/* Daily Mission */}
      <DailyMission
        prompt={dailyPrompt}
        completedToday={user.completedToday}
        onComplete={handleMissionComplete}
      />

      {/* Leaderboard */}
      <Leaderboard currentUserPoints={user.points} data={leaderboard} />

      {/* Aggregate Impact */}
      <div className="mt-8 p-4 rounded-xl bg-green-100">
        <h2 className="text-xl font-bold text-green-900 mb-2">
          Impact Overview
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-lg font-semibold">
              {aggregateImpact.co2.toFixed(1)} kg CO₂
            </div>
            <div className="text-sm text-green-700">Total CO₂ saved</div>
          </div>
          <div>
            <div className="text-lg font-semibold">
              {aggregateImpact.water.toFixed(1)} L
            </div>
            <div className="text-sm text-green-700">Total Water Saved</div>
          </div>
          <div>
            <div className="text-lg font-semibold">
              {aggregateImpact.waste.toFixed(1)} kg
            </div>
            <div className="text-sm text-green-700">Total Waste Reduced</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
