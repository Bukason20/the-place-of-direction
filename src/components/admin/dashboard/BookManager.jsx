import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, BookOpen } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance, { MEDIA_BASE_URL } from "../../../services/api";

const emptyForm = { title: "", price: "", description: "" };

const BookManager = () => {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books?populate=*", { headers });
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (book) => {
    setForm({
      title: book.title,
      price: book.price,
      description: book.description?.[0]?.children?.[0]?.text || "",
    });
    setImageFile(null);
    setEditingId(book.documentId);
    setError("");
    setShowForm(true);
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    setDeletingId(documentId);
    try {
      await axiosInstance.delete(`/books/${documentId}`, { headers });
      setBooks((prev) => prev.filter((b) => b.documentId !== documentId));
    } catch {
      alert("Failed to delete book.");
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
          price: Number(form.price),
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
        await axiosInstance.put(`/books/${editingId}`, payload, { headers });
      } else {
        await axiosInstance.post("/books", payload, { headers });
      }

      setShowForm(false);
      fetchBooks();
    } catch (err) {
      setError("Failed to save book. Please check all fields.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-1">Books</h2>
          <p className="text-blue-300">Manage your shop resources</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition text-sm"
        >
          <Plus size={18} />
          Add Book
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white font-black text-lg">
                {editingId ? "Edit Book" : "New Book"}
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
                  Price (₦) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
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
                  Book Image {editingId ? "(leave empty to keep current)" : ""}
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
                  {saving ? "Saving..." : "Save Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-20 text-blue-300">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-blue-300">
          No books yet. Add your first one!
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book) => {
            const imageUrl = book.image?.formats?.small?.url || book.image?.url;
            return (
              <div
                key={book.id}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="h-36 relative overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={`${MEDIA_BASE_URL}${imageUrl}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                      <BookOpen size={40} className="text-white opacity-30" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-white font-bold mb-1 truncate">
                    {book.title}
                  </h4>
                  <p className="text-cyan-400 font-black text-lg mb-3">
                    ₦{book.price?.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(book)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-600/30 hover:bg-blue-600/60 text-blue-300 hover:text-white rounded-lg py-2 transition text-sm font-medium"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.documentId)}
                      disabled={deletingId === book.documentId}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-600/30 hover:bg-red-600/60 text-red-300 hover:text-white rounded-lg py-2 transition text-sm font-medium disabled:opacity-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookManager;
