import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import { useAuth } from "../../context/AuthContext";

const TAB_TITLES = {
  overview: "Dashboard Overview",
  sermons: "Sermons",
  events: "Events",
  books: "Books",
  orders: "Orders",
  "one-on-one": "One-on-One Registrations",
};

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-blue-300 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin" replace />;

  // Derive active tab from the URL, e.g. /admin/dashboard/orders -> "orders"
  const segments = location.pathname.split("/").filter(Boolean);
  const activeTab = segments[2] || "overview"; // ["admin","dashboard","orders"]
  const title = TAB_TITLES[activeTab] || "Dashboard";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      <Sidebar
        activeTab={activeTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-white font-bold">{title}</h1>
        </div>

        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
