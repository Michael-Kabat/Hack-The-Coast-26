import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";  
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { UserStats } from "./components/UserStats.jsx";
<<<<<<< HEAD
import { Tabs, TabsTrigger, TabsContent, TabsList } from "./components/ui/tabs.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { DailyMission } from "./components/DailyMission.jsx";
import { completeDaily } from "./api/users";
=======
import { Tabs } from "./components/ui/tabs.jsx";
import { TabsTrigger } from "./components/ui/tabs.jsx";
import { TabsContent } from "./components/ui/tabs.jsx";
import { TabsList } from "./components/ui/tabs.jsx";
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
>>>>>>> b372f8769eb29e0fc96173f2b7ea1aea6fdf8535

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

<<<<<<< HEAD
  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
=======
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
>>>>>>> b372f8769eb29e0fc96173f2b7ea1aea6fdf8535
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
<<<<<<< HEAD
    <Router>
      <div className="App">
        {/* Optional navigation buttons */}
        <nav className="p-4 bg-green-100 flex gap-4 justify-center">
          <Link to="/home"><button>Home</button></Link>
          <Link to="/leadership"><button>Leadership</button></Link>
        </nav>

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

        {/* Footer */}
        <footer className="mt-12 border-t bg-white/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-green-700">
              🌍 Together, we can make a difference. Complete daily missions and inspire others!
            </p>
          </div>
        </footer>
      </div>
    </Router>
=======
    <div className="App">
      {!user && (
        <header className="App-header">
          {/* Main Content */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* User Stats */}
              <UserStats
                totalPoints={user.points}
                streak={user.currentStreak}
                completedMissions={user.totalCompleted}
              />

              {/* Tabs */}
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

          {/* Footer */}
          <footer className="mt-12 border-t bg-white/30 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-green-700">
                🌍 Together, we can make a difference. Complete daily missions
                and inspire others!
              </p>
            </div>
          </footer>
          <LandingPage />
        </header>
      )}

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
>>>>>>> b372f8769eb29e0fc96173f2b7ea1aea6fdf8535
  );
}

export default App;
