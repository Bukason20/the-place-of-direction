import React, { useEffect, useState } from "react";
import { Loader2, RefreshCw, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../services/api";

const OneOnOneManager = () => {
  const { token } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchRegistrations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/one-on-one-registrations", {
        headers,
        params: {
          sort: "createdAt:desc",
          pagination: { pageSize: 200 },
        },
      });
      setRegistrations(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
      setError("Could not load registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleExport = () => {
    const rows = registrations.map((r) => ({
      Name: r.name,
      "Phone Number": r.phoneNumber,
      Email: r.email,
      "Country of Residence": r.countryOfResidence,
      "Preferred Location": r.preferredLocation,
      "Other Location Detail": r.otherLocationDetail || "",
      "Number of Times": r.numberOfTimes,
      "Wants Updates":
        r.wantsUpdates === null ? "" : r.wantsUpdates ? "Yes" : "No",
      "WhatsApp Number": r.whatsappNumber || "",
      "How Heard About Us": r.howHeardAboutUs || "",
      "Submitted On": new Date(r.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    const dateStamp = new Date().toISOString().split("T")[0];

    XLSX.writeFile(workbook, `one-on-one-registrations-${dateStamp}.xlsx`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-blue-200 text-sm">
          {registrations.length} registration
          {registrations.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={registrations.length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            <Download size={16} />
            Export to Excel
          </button>
          <button
            onClick={fetchRegistrations}
            className="flex items-center gap-2 text-blue-300 hover:text-white text-sm font-semibold transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-blue-300 py-10 justify-center">
          <Loader2 size={20} className="animate-spin" />
          Loading registrations...
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {!loading && !error && registrations.length === 0 && (
        <p className="text-blue-300 text-center py-10">
          No registrations found.
        </p>
      )}

      {!loading && registrations.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-blue-200 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Preferred Location</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-white/10 text-white/90"
                >
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.phoneNumber}</td>
                  <td className="px-4 py-3">{r.whatsappNumber}</td>
                  <td className="px-4 py-3">{r.countryOfResidence}</td>
                  <td className="px-4 py-3">
                    {r.preferredLocation === "Other"
                      ? r.otherLocationDetail
                      : r.preferredLocation}
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OneOnOneManager;
