// Libraries.
import { useState } from "react";

// Dependencies.
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Screens/Dashboard";
import UploadScreen from "./components/Screens/Upload";
import "./App.css";
import NavBar from "./components/NavBar";

// Renders the App.
function App() {
  // State.
  const [activeScreen, setActiveScreen] = useState("dashboard");
  return (
    <div className="App">
      <NavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <div className="project-MVC-Body">
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/upload" Component={UploadScreen} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
