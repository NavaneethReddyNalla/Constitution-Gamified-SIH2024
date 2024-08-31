import React from "react";
import AdminSideBar from "../../components/admin side bar/AdminSideBar";
import { Outlet } from "react-router-dom";
import "./AdminPage.css";
function AdminPage() {
  return (
    <div className="admin-page-style">
      <AdminSideBar />
      <Outlet/>
    </div>
  );
}

export default AdminPage;
