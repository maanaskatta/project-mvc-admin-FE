// Dependencies.
import { Link, useLocation } from "react-router-dom";
import { BsSpeedometer2 } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import "./styled.css";

// Renders the NavBar.
function NavBar() {
  // State.
  const activeScreen = useLocation().pathname.split("/")[1];
  // Markup.
  return (
    <nav className="project-MVC-NavBar">
      <ul>
        <li>
          <Link to="/" className={activeScreen === "" ? "active" : "inactive"}>
            <BsSpeedometer2 />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            className={activeScreen === "upload" ? "active" : "inactive"}>
            <FiUploadCloud />
            <span>Upload</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
