// Dependencies.
import { Link } from "react-router-dom";
import { BsSpeedometer2 } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import "./styled.css";

export type NavBarProps = {
  activeScreen: string;
  setActiveScreen: any;
};

// Renders the NavBar.
function NavBar({ activeScreen, setActiveScreen }: NavBarProps) {
  return (
    <nav className="project-MVC-NavBar">
      <ul>
        <li>
          <Link
            to="/"
            onClick={() => setActiveScreen("dashboard")}
            className={activeScreen === "dashboard" ? "active" : "inactive"}>
            <BsSpeedometer2 />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            onClick={() => setActiveScreen("upload")}
            className={activeScreen === "upload" ? "active" : "inactive"}>
            <FiUploadCloud />
            Upload
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
