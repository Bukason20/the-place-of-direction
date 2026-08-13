import React from "react";
import {
  LayoutDashboard,
  Headphones,
  Calendar,
  BookOpen,
  ShoppingCart,
  Users,
  LogOut,
  Shield,
  X,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, path: "" },
  { id: "sermons", label: "Sermons", icon: Headphones, path: "sermons" },
  { id: "events", label: "Events", icon: Calendar, path: "events" },
  { id: "books", label: "Books", icon: BookOpen, path: "books" },
  { id: "orders", label: "Orders", icon: ShoppingCart, path: "orders" },
  {
    id: "one-on-one",
    label: "One-on-One",
    icon: Users,
    path: "one-on-one",
  },
];

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout();
    navigateTo("/admin");
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-900/80 to-slate-900 border-r border-white/10 z-30 transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-black text-sm leading-tight">
                  Place of Direction
                </p>
                <p className="text-blue-300 text-xs">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-white/10 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              {/* <p className="text-white text-sm font-bold bg-amber-800 overflow-x-hidden">
                {user?.username || "Admin"}
              </p> */}
              <p className="text-blue-300 text-xs truncate max-w-[120px]">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {navItems.map(({ id, label, icon: Icon, path }) => (
            <NavLink
              key={id}
              to={`/admin/dashboard${path ? `/${path}` : ""}`}
              end={path === ""}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 font-semibold text-sm transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
