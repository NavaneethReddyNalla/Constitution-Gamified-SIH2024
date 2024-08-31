import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";  // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar navbar-light navbar-expanded-sm custom-navbar">
      <div className="branding mx-3">
        <NavLink to={"/"} className="branding-link">
          <h1>Sansthaein Aur Samvidhan</h1>
        </NavLink>
      </div>

      <div className="admin-login ml-auto mx-3">
        <NavLink to={"/roadmap"}>
          <button className="btn admin-btn">
            RoadMap
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
