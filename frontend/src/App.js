import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { UserStats } from "./components/UserStats.jsx";
import {
  Tabs,
  TabsTrigger,
  TabsContent,
  TabsList,
} from "./components/ui/tabs.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { DailyMission } from "./components/DailyMission.jsx";

import {
  loginUser,
  registerUser,
  completeDaily,
  getDailyPrompt,
  getLeaderboard,
  getAggregates,
} from "./api/users";

function App() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [aggregates, setAggregates] = useState({
    co2: 0,
    water: 0,
    waste: 0,
  });
  const [totalUsers, setTotalUsers] = useState(0);

  // Restore session
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Fetch leaderboard and aggregates
  const fetchData = async () => {
    try {
      const [lbRes, aggRes, promptRes] = await Promise.all([
        getLeaderboard(),
        getAggregates(),
        getDailyPrompt(),
      ]);
      setLeaderboard(lbRes.data); // top 10 users
      setAggregates(aggRes.data); // { co2, water, waste }
      setDailyPrompt(promptRes.data.prompt); // daily prompt text
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  // SignIn / Register handler
  const handleSignIn = async (credentials) => {
    try {
      console.log(credentials);
      const res = await registerUser(credentials);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Auth error:", err);
      alert("Login failed. Check your email and password."); // optional UX
    }
  };

  // Complete daily mission
  const handleMissionComplete = async () => {
    if (!user) return;
    try {
      const res = await completeDaily(user.id);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      fetchData(); // refresh leaderboard and aggregates
    } catch (err) {
      console.error("Failed to complete mission:", err);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />

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
                    aggregates={aggregates} // show aggregate analysis
                    userContribution={{
                      co2: user.impact?.co2 || 0,
                      water: user.impact?.water || 0,
                      waste: user.impact?.waste || 0,
                    }}
                    totalUsers={totalUsers}
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
                        prompt={dailyPrompt}
                      />
                    </TabsContent>

                    <TabsContent value="leaderboard" className="space-y-4">
                      <Leaderboard
                        currentUserPoints={user.points}
                        leaderboard={leaderboard}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </main>
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
    </Router>
  );
}

export default App;
