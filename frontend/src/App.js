import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {SignIn} from "./components/SignIn.jsx";
import {UserStats} from "./components/UserStats.jsx";
import {Tabs} from "./components/ui/tabs.jsx";
import {TabsTrigger} from "./components/ui/tabs.jsx";
import {TabsContent} from "./components/ui/tabs.jsx";
import {TabsList} from "./components/ui/tabs.jsx";
import {Leaderboard} from "./components/Leaderboard.jsx";
import {DailyMission} from "./components/DailyMission.jsx";


// API helpers (example)
import { completeDaily } from "./api/users";

function App() {
  // 🔑 Single source of truth
  const [user, setUser] = useState(null);

  // 🔄 Restore session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Called after successful login/register
  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Backend-controlled mission completion
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
  if (!user) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
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
            🌍 Together, we can make a difference. Complete daily missions and
            inspire others!
          </p>
        </div>
      </footer>
          <LandingPage/>
        </header>
      )}

      {user && (
        <main>
          <h1>Welcome, {user} 🌱</h1>
          <p>Your sustainability journey starts here.</p>
        </main>
      )}
    </div>
  );
}

export default App;
