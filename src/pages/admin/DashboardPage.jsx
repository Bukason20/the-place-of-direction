import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import StatsOverview from "../../components/admin/dashboard/StatsOverview";
import SermonManager from "../../components/admin/dashboard/SermonManager";
import EventManager from "../../components/admin/dashboard/EventManager";
import BookManager from "../../components/admin/dashboard/BookManager";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-blue-300 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <StatsOverview />;
      case "sermons":
        return <SermonManager />;
      case "events":
        return <EventManager />;
      case "books":
        return <BookManager />;
      default:
        return <StatsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-white font-bold capitalize">
            {activeTab === "overview" ? "Dashboard Overview" : activeTab}
          </h1>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10">{renderTab()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;
