import React, { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../services/api";

const statusColor = {
  paid: "bg-green-500/20 text-green-300 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  failed: "bg-red-500/20 text-red-300 border-red-500/30",
  refunded: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

const OrdersManager = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/orders", {
        headers,
        params: {
          sort: "createdAt:desc",
          pagination: { pageSize: 100 },
        },
      });
      setOrders(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Could not load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-blue-200 text-sm">{orders.length} orders</p>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 text-blue-300 hover:text-white text-sm font-semibold transition"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-blue-300 py-10 justify-center">
          <Loader2 size={20} className="animate-spin" />
          Loading orders...
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-blue-300 text-center py-10">No orders yet.</p>
      )}

      {!loading && orders.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-blue-200 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-white/10 text-white/90"
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {order.reference}
                  </td>
                  <td className="px-4 py-3">{order.customerName}</td>
                  <td className="px-4 py-3">{order.customerEmail}</td>
                  <td className="px-4 py-3">{order.customerPhone}</td>
                  <td className="px-4 py-3 font-semibold">
                    ₦{Number(order.totalAmount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                        statusColor[order.paymentStatus] ||
                        "bg-gray-500/20 text-gray-300 border-gray-500/30"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {new Date(order.createdAt).toLocaleDateString()}
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

export default OrdersManager;
