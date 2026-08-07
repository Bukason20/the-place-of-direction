import React, { useEffect, useState } from "react";
import { Headphones, Calendar, BookOpen, TrendingUp } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../services/api";

const StatCard = ({ icon: Icon, label, count, color, loading }) => (
  <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-center gap-4">
    <div
      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
    >
      <Icon size={26} className="text-white" />
    </div>
    <div>
      <p className="text-blue-200 text-sm font-medium">{label}</p>
      <p className="text-white text-3xl font-black">
        {loading ? "..." : count}
      </p>
    </div>
  </div>
);

const StatsOverview = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({ sermons: 0, events: 0, books: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [sermons, events, books] = await Promise.all([
          axiosInstance.get("/sermons?pagination[pageSize]=1", { headers }),
          axiosInstance.get("/events?pagination[pageSize]=1", { headers }),
          axiosInstance.get("/books?pagination[pageSize]=1", { headers }),
        ]);
        setStats({
          sermons: sermons.data.meta.pagination.total,
          events: events.data.meta.pagination.total,
          books: books.data.meta.pagination.total,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white mb-1">Overview</h2>
        <p className="text-blue-300">Welcome back! Here's what's going on.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard
          icon={Headphones}
          label="Total Sermons"
          count={stats.sermons}
          color="from-blue-500 to-cyan-500"
          loading={loading}
        />
        <StatCard
          icon={Calendar}
          label="Total Events"
          count={stats.events}
          color="from-purple-500 to-pink-500"
          loading={loading}
        />
        <StatCard
          icon={BookOpen}
          label="Total Books"
          count={stats.books}
          color="from-indigo-500 to-blue-500"
          loading={loading}
        />
      </div>

      {/* Quick tips */}
      <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={20} className="text-cyan-400" />
          <h3 className="text-white font-bold">Quick Guide</h3>
        </div>
        <ul className="space-y-2 text-blue-200 text-sm">
          <li>
            • Use the <span className="text-white font-semibold">Sermons</span>{" "}
            tab to upload new audio messages
          </li>
          <li>
            • Use the <span className="text-white font-semibold">Events</span>{" "}
            tab to create and manage upcoming events
          </li>
          <li>
            • Use the <span className="text-white font-semibold">Books</span>{" "}
            tab to manage your shop resources
          </li>
          <li>• All changes reflect immediately on your live website</li>
        </ul>
      </div>
    </div>
  );
};

export default StatsOverview;
