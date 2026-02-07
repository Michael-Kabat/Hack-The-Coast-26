import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
import { StandaloneSignIn } from "./pages/StandaloneSignIn";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      {!user && (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <StandaloneSignIn onSignIn={(username) => setUser(username)} />
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
