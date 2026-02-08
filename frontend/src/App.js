import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./components/SignIn.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import {
  registerUser,
  loginUser,
  completeDaily,
  getDailyPrompt,
  getLeaderboard,
  getAggregates,
} from "./api/users";

function AppRoutes() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyPrompt, setDailyPrompt] = useState(null);
  const [aggregates, setAggregates] = useState({ co2: 0, water: 0, waste: 0 });

  // Fetch leaderboard, aggregates, and prompt
  const fetchData = async () => {
    try {
      const [lbRes, aggRes, promptRes] = await Promise.all([
        getLeaderboard(),
        getAggregates(),
        getDailyPrompt(),
      ]);

      setLeaderboard(lbRes.data);
      setAggregates(aggRes.data);
      setDailyPrompt(promptRes.data); // full prompt object
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignIn = async (credentials) => {
    try {
      // 1️⃣ Try login
      const res = await loginUser(credentials);
      setUser(res.data);
      navigate("/home");
    } catch (loginErr) {
      try {
        // 2️⃣ If login fails, register
        const res = await registerUser(credentials);
        setUser(res.data);
        navigate("/home");
      } catch (registerErr) {
        console.error("Auth error:", registerErr);
        alert(registerErr.response?.data?.error || "Authentication failed");
      }
    }
  };

  const handleMissionComplete = async () => {
    console.log(user);
    fetchData();
    if (!user?._id || !dailyPrompt) return;

    const payload = {
      points: dailyPrompt.points || 10,
      impact: {
        co2: dailyPrompt.co2_kg || 0,
        water: dailyPrompt.water_liters || 0,
        waste: dailyPrompt.waste_kg || 0,
      },
    };

    try {
      const res = await completeDaily(user._id, payload);
      const data = res.data;

      // Update user state with returned stats
      setUser((prev) => ({
        ...prev,
        points: data.points,
        currentStreak: data.currentStreak,
        longestStreak: data.longestStreak,
        totalCompleted: data.totalCompleted,
        completedToday: true,
      }));

       // refresh leaderboard & totals
    } catch (err) {
      console.error("Failed to complete mission:", err);
      alert(err.response?.data?.error || "Failed to complete challenge");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
      <Route path="/stats" element={
        user ? (<StatsPage />): (
            <Navigate to="/signin" />)} />
      <Route
        path="/home"
        element={
          user ? (
            <HomePage
              user={user}
              dailyPrompt={dailyPrompt}
              onComplete={handleMissionComplete}
            />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/leaderboard"
        element={
          user ? (
            <Leaderboard leaderboard={leaderboard} />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
