import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { SignIn } from "./components/SignIn.jsx";
import { DailyMission } from "./components/DailyMission.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { UserStats } from "./components/UserStats.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs.jsx";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <Leaf className="size-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-900">EcoQuest</h1>
              <p className="text-sm text-green-700">
                Save the planet, one mission at a time
              </p>
            </div>
          </div>
        </div>
      </header>

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
    </div>
  );
}

export default App;
