import { useState } from "react";
//import LandingPage  from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user && (
        <header className="App-header">


          
          <HomePage/>
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



