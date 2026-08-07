import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Headphones } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../services/api";
import { MEDIA_BASE_URL } from "../../../services/api";

const emptyForm = { title: "", date: "", description: "" };

const SermonManager = () => {
  const { token } = useAuth();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [audioFile, setAudioFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchSermons = async () => {
    try {
      const res = await axiosInstance.get("/sermons?populate=*", { headers });
      setSermons(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setAudioFile(null);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (sermon) => {
    setForm({
      title: sermon.title,
      date: sermon.date,
      description: sermon.description?.[0]?.children?.[0]?.text || "",
    });
    setAudioFile(null);
    setEditingId(sermon.documentId);
    setError("");
    setShowForm(true);
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this sermon?")) return;
    setDeletingId(documentId);
    try {
      await axiosInstance.delete(`/sermons/${documentId}`, { headers });
      setSermons((prev) => prev.filter((s) => s.documentId !== documentId));
    } catch {
      alert("Failed to delete sermon.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let audioId = null;

      // Upload audio file if provided
      if (audioFile) {
        const formData = new FormData();
        formData.append("files", audioFile);
        const uploadRes = await axiosInstance.post("/upload", formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
        audioId = uploadRes.data[0].id;
      }

      const payload = {
        data: {
          title: form.title,
          date: form.date,
          description: [
            {
              type: "paragraph",
              children: [{ type: "text", text: form.description }],
            },
          ],
          ...(audioId && { audio: audioId }),
        },
      };

      if (editingId) {
        await axiosInstance.put(`/sermons/${editingId}`, payload, { headers });
      } else {
        await axiosInstance.post("/sermons", payload, { headers });
      }

      setShowForm(false);
      fetchSermons();
    } catch (err) {
      setError("Failed to save sermon. Please check all fields.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-1">Sermons</h2>
          <p className="text-blue-300">Manage your audio messages</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition text-sm"
        >
          <Plus size={18} />
          Add Sermon
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white font-black text-lg">
                {editingId ? "Edit Sermon" : "New Sermon"}
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
                  Audio File {editingId ? "(leave empty to keep current)" : "*"}
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
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
                  {saving ? "Saving..." : "Save Sermon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-20 text-blue-300">
          Loading sermons...
        </div>
      ) : sermons.length === 0 ? (
        <div className="text-center py-20 text-blue-300">
          No sermons yet. Add your first one!
        </div>
      ) : (
        <div className="space-y-4">
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Headphones size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold truncate">
                  {sermon.title}
                </h4>
                <p className="text-blue-300 text-sm">
                  {new Date(sermon.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {sermon.audio?.url && (
                  <audio controls className="mt-2 w-full max-w-xs h-8">
                    <source
                      src={`${MEDIA_BASE_URL}${sermon.audio.url}`}
                      type="audio/mpeg"
                    />
                  </audio>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(sermon)}
                  className="p-2 bg-blue-600/30 hover:bg-blue-600/60 text-blue-300 hover:text-white rounded-lg transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(sermon.documentId)}
                  disabled={deletingId === sermon.documentId}
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

export default SermonManager;
