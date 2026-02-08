import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { UserStats } from "./components/UserStats.jsx";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "./components/ui/tabs.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { DailyMission } from "./components/DailyMission.jsx";

// API helpers
import {
  loginUser,
  createUser,
  completeDaily,
  getLeaderboard,
  getAllUsers,
} from "./api/users";

function App() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [aggregateImpact, setAggregateImpact] = useState({
    co2: 0,
    water: 0,
    waste: 0,
  });

  // Restore session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Sign in handler
  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Complete daily mission
  const handleMissionComplete = async () => {
    if (!user) return;
    try {
      const res = await completeDaily(user.id);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      // Refresh leaderboard
      getLeaderboard().then((res) => setLeaderboard(res.data));

      // Update aggregate impact
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

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* SignIn page */}
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />

        {/* Home page - protected */}
        <Route
          path="/home"
          element={
            user ? (
              <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                  <UserStats
                    totalPoints={user.points}
                    streak={user.currentStreak}
                    completedMissions={user.totalCompleted}
                  />

                  <Tabs defaultValue="mission" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="mission">Daily Mission</TabsTrigger>
                      <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    </TabsList>

                    <TabsContent value="mission" className="space-y-4">
                      <DailyMission
                        onComplete={handleMissionComplete}
                        completedToday={user.completedToday}
                      />
                    </TabsContent>

                    <TabsContent value="leaderboard" className="space-y-4">
                      <Leaderboard currentUserPoints={user.points} />
                    </TabsContent>
                  </Tabs>
                </div>
              </main>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Leaderboard page - protected */}
        <Route
          path="/leaderboard"
          element={user ? <Leaderboard /> : <Navigate to="/signin" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
