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

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedMissions, setCompletedMissions] = useState(0);

  useEffect(() => {
    // Check if user is already signed in
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsSignedIn(true);
    }

    // Load user data from localStorage
    const savedPoints = parseInt(localStorage.getItem("totalPoints") || "0");
    const savedStreak = parseInt(localStorage.getItem("userStreak") || "0");
    const savedMissions = parseInt(
      localStorage.getItem("completedMissions") || "0",
    );

    setTotalPoints(savedPoints);
    setStreak(savedStreak);
    setCompletedMissions(savedMissions);

    // Check streak continuation
    const lastCompletedDate = localStorage.getItem("lastCompletedMission");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCompletedDate) {
      const lastDate = new Date(lastCompletedDate);
      // If last completion was not today or yesterday, reset streak
      if (
        lastDate.toDateString() !== today.toDateString() &&
        lastDate.toDateString() !== yesterday.toDateString()
      ) {
        localStorage.setItem("userStreak", "0");
        setStreak(0);
      }
    }
  }, []);

  const handleSignIn = (username) => {
    setUsername(username);
    setIsSignedIn(true);
    localStorage.setItem("username", username);
  };

  const handleMissionComplete = (points) => {
    const newPoints = totalPoints + points;
    const newStreak = streak + 1;
    const newCompletedMissions = completedMissions + 1;

    setTotalPoints(newPoints);
    setStreak(newStreak);
    setCompletedMissions(newCompletedMissions);

    localStorage.setItem("totalPoints", newPoints.toString());
    localStorage.setItem("userStreak", newStreak.toString());
    localStorage.setItem("completedMissions", newCompletedMissions.toString());
  };

  if (!isSignedIn) {
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
            totalPoints={totalPoints}
            streak={streak}
            completedMissions={completedMissions}
          />

          {/* Tabs for Mission and Leaderboard */}
          <Tabs defaultValue="mission" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mission">Daily Mission</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="mission" className="space-y-4">
              <DailyMission onComplete={handleMissionComplete} />
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Leaderboard currentUserPoints={totalPoints} />
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
