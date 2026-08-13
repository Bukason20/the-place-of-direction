import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Calendar } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../services/api";

const emptyForm = {
  title: "",
  date: "",
  start_time: "",
  end_time: "",
  location: "",
  description: "",
};

// Strapi's time field expects HH:mm:ss.SSS, but <input type="time">
// only gives HH:mm — pad it out before sending.
const toStrapiTime = (value) => {
  if (!value) return value;
  return value.length === 5 ? `${value}:00.000` : value;
};

const EventManager = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/events?populate=*", { headers });
      setEvents(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (event) => {
    setForm({
      title: event.title,
      date: event.date,
      start_time: event.start_time?.slice(0, 5) || "",
      end_time: event.end_time?.slice(0, 5) || "",
      location: event.location || "",
      description: event.description?.[0]?.children?.[0]?.text || "",
    });
    setImageFile(null);
    setEditingId(event.documentId);
    setError("");
    setShowForm(true);
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(documentId);
    try {
      await axiosInstance.delete(`/events/${documentId}`, { headers });
      setEvents((prev) => prev.filter((e) => e.documentId !== documentId));
    } catch {
      alert("Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imageId = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);
        const uploadRes = await axiosInstance.post("/upload", formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
        imageId = uploadRes.data[0].id;
      }

      const payload = {
        data: {
          title: form.title,
          date: form.date,
          start_time: toStrapiTime(form.start_time),
          end_time: toStrapiTime(form.end_time),
          location: form.location,
          description: [
            {
              type: "paragraph",
              children: [{ type: "text", text: form.description }],
            },
          ],
          ...(imageId && { image: imageId }),
        },
      };

      if (editingId) {
        await axiosInstance.put(`/events/${editingId}`, payload, { headers });
      } else {
        await axiosInstance.post("/events", payload, { headers });
      }

      setShowForm(false);
      fetchEvents();
    } catch (err) {
      setError("Failed to save event. Please check all fields.");
    } finally {
      setSaving(false);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "TBA";
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${minute} ${ampm}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-1">Events</h2>
          <p className="text-blue-300">Manage your upcoming events</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition text-sm"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white font-black text-lg">
                {editingId ? "Edit Event" : "New Event"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-200 text-sm font-medium mb-1 block">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.start_time}
                    onChange={(e) =>
                      setForm({ ...form, start_time: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="text-blue-200 text-sm font-medium mb-1 block">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.end_time}
                    onChange={(e) =>
                      setForm({ ...form, end_time: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition resize-none"
                />
              </div>

              <div>
                <label className="text-blue-200 text-sm font-medium mb-1 block">
                  Event Image {editingId ? "(leave empty to keep current)" : ""}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 transition file:mr-3 file:bg-blue-600 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-white/20 text-white py-2.5 rounded-xl font-bold hover:bg-white/10 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl font-bold hover:shadow-lg transition text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-20 text-blue-300">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 text-blue-300">
          No events yet. Add your first one!
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold truncate">{event.title}</h4>
                <p className="text-blue-300 text-sm">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {" · "}
                  {formatTime(event.start_time)} — {formatTime(event.end_time)}
                </p>
                <p className="text-blue-400 text-xs capitalize">
                  {event.location}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(event)}
                  className="p-2 bg-blue-600/30 hover:bg-blue-600/60 text-blue-300 hover:text-white rounded-lg transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(event.documentId)}
                  disabled={deletingId === event.documentId}
                  className="p-2 bg-red-600/30 hover:bg-red-600/60 text-red-300 hover:text-white rounded-lg transition disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManager;
