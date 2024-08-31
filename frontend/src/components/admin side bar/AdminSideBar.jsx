import React from "react";
import "./AdminSideBar.css";
import { MdAddCircleOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

import { NavLink } from "react-router-dom";

function ClientSidebar() {
  return (
    <div className="client-sidebar">
      <div>
        <div className="client-sidebar-options">
          <NavLink
            to="add"
            className="client-sidebar-option"
            style={{ color: "black", textDecoration: "none" }}
          >
            <MdAddCircleOutline fontSize={30} />
            <p className="lead">Add Card</p>
          </NavLink>

          <NavLink
            to="manage-cards"
            className="client-sidebar-option"
            style={{ color: "black", textDecoration: "none" }}
          >
            <FiEdit fontSize={30} />
            <p className="lead">Manage Cards</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ClientSidebar;
