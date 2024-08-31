import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");

  // If token exists, render the requested element (page)
  // Otherwise, redirect to the admin-login page
  return token ? element : <Navigate to="/admin-login" replace />;
};

export default PrivateRoute;
