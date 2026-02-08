import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";  
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
  getDailyPrompt,
  getLeaderboard,
  getAllUsers,
} from "./api/users";

function App() {
  // 🔑 Hooks at the top
  const [user, setUser] = useState(null);
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [aggregateImpact, setAggregateImpact] = useState({
    co2: 0,
    water: 0,
    waste: 0,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

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
  if (!user) return <SignIn onSignIn={handleSignIn} />;

  return (
    <Router>
      <div className="App">
        {/* Page routes */}
        <Routes>
          <Route path="/home" element={
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
          }/>

          <Route path="/leaderboard" element={<Leaderboard/>} />

          <Route path="/" element={<LandingPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
