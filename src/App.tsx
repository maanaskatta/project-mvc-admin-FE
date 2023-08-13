// Libraries.

// Dependencies.
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Screens/Dashboard";
import UploadScreen from "./components/Screens/Upload";

// Renders the App.
function App() {
  // State.
  return (
    <div className="App">
      <NavBar />
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
