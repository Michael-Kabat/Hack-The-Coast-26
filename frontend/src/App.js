import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";  
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { UserStats } from "./components/UserStats.jsx";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "./components/ui/tabs.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { DailyMission } from "./components/DailyMission.jsx";
import { completeDaily } from "./api/users";

function App() {
  // 🔑 Hooks at the top
  const [user, setUser] = useState(null);

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
    } catch (err) {
      console.error("Failed to complete mission:", err);
    }
  };

  // 🚪 Not signed in
  if (!user) return <SignIn onSignIn={handleSignIn} />;

  return (
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
  );
}

export default App;
