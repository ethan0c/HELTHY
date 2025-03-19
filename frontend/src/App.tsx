import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Auth/Login.tsx";
import { FoodLog } from "./components/FoodLog/FoodLog.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import WeightLog from "./components/Weight/WeightLogger.tsx";
import Settings from "./components/Settings/Settings.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import "./App.css";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/food-log" element={<FoodLog user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/weight-log" element={<WeightLog user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
