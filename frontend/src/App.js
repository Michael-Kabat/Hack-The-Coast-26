import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { SignIn } from "./components/SignIn.jsx";

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
          <LandingPage />
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
