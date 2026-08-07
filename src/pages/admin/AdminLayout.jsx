import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AdminLayout;
