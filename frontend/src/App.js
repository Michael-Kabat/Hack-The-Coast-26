import logo from "./logo.svg";
import { useState } from "react";
import LandingPage  from "./pages/LandingPage.jsx";

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
    <div className="App">
      {!user && (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

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
