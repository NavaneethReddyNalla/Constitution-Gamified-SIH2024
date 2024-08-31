import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light navbar-expanded-sm">
      <div className="branding mx-3">
        <NavLink to={"/"} style={{color:"black"}}>
          <h1>Flash Study</h1>
        </NavLink>
      </div>

      <div className="admin-login ml-auto mx-3">
        <NavLink to={"/admin-login"}>
          <button className="btn" style={{ backgroundColor: "#f7b093" }}>
            Admin Login
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
