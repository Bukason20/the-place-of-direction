import { BookOpen, Tag, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HeroBg } from "../assets";
import Navbar from "../components/Navbar";
import bookService from "../services/books";
import { MEDIA_BASE_URL } from "../services/api";

const WHATSAPP_NUMBER = "2348128276293";

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-orange-500 to-red-500",
  "from-teal-500 to-cyan-500",
  "from-yellow-500 to-orange-500",
];

const openWhatsApp = (book) => {
  const message =
    `Hello! 👋 I'd like to purchase *${book.title}* ` +
    `for *₦${book.price.toLocaleString()}*. Please let me know how to proceed. Thank you!`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

const ShopPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden min-h-[60vh] flex flex-col justify-center">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/65 via-purple-900/55 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40 pb-24">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Resources
          </span>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Shop
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light drop-shadow-lg">
            Resources to support your spiritual journey
          </p>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-2">
              All Products
            </span>
            <h2 className="text-4xl font-black text-gray-900">
              Spiritual Resources
            </h2>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-20 text-gray-400 text-lg font-medium">
              Loading resources...
            </div>
          )}

          {/* Empty state */}
          {!loading && books.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-lg font-medium">
              No resources available yet. Check back soon!
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {books.map((book, index) => {
              const gradient = gradients[index % gradients.length];
              const imageUrl =
                book.image?.formats?.medium?.url ||
                book.image?.formats?.small?.url ||
                book.image?.url;

              return (
                <div key={book.id} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition duration-500`}
                  />
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-gray-100 hover:border-transparent flex flex-col">
                    {/* Thumbnail */}
                    <div className="h-56 relative overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={`${MEDIA_BASE_URL}${imageUrl}`}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
                        >
                          <BookOpen
                            size={64}
                            className="text-white opacity-25"
                          />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                      {/* Book badge */}
                      <span className="absolute top-4 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                        <Tag size={10} />
                        Book
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-700 transition">
                        {book.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">
                        {book.description?.[0]?.children?.[0]?.text}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-black text-xl">
                          ₦{book.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => openWhatsApp(book)}
                          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition"
                        >
                          <MessageCircle size={16} />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-slate-900 rounded-3xl p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
            <div className="relative">
              <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-6">
                <MessageCircle size={36} className="text-[#25D366]" />
              </div>
              <h2 className="text-4xl font-black mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto">
                Invest in your spiritual growth today. Click any product and
                place your order directly via WhatsApp — quick and easy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
