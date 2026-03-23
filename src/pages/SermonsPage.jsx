import {
  BookOpen,
  ChevronRight,
  Headphones,
  Bell,
  Calendar,
  Pause,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { HeroBg } from "../assets";
import Navbar from "../components/Navbar";
import sermonService from "../services/sermons";
import { MEDIA_BASE_URL } from "../services/api";

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-cyan-500 to-teal-500",
];

const SermonsPage = () => {
  const [allSermons, setAllSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await sermonService.getAllSermons();
        setAllSermons(data.data);
      } catch (error) {
        console.error("Failed to fetch sermons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const handleListenNow = (sermonId) => {
    const currentAudio = audioRefs.current[sermonId];

    // Pause all other audios
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (Number(id) !== sermonId && audio) {
        audio.pause();
      }
    });

    if (!currentAudio) return;

    if (playingId === sermonId && !currentAudio.paused) {
      currentAudio.pause();
      setPlayingId(null);
    } else {
      currentAudio.play();
      setPlayingId(sermonId);
    }
  };

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

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40 pb-24">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4">
            The Word
          </span>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            Sermons &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Messages
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light drop-shadow-lg">
            Listen to powerful teachings that transform lives
          </p>
        </div>
      </section>

      {/* ── SERMONS GRID ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-3">
              Library
            </span>
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Message Archive
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Powerful messages of transformation and spiritual growth
            </p>
          </div>

          {loading && (
            <div className="text-center py-20 text-gray-400 text-lg font-medium">
              Loading sermons...
            </div>
          )}

          {!loading && allSermons.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-lg font-medium">
              No sermons available yet. Check back soon!
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {allSermons.map((sermon, index) => {
              const isPlaying = playingId === sermon.id;

              return (
                <div key={sermon.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition duration-500" />

                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-gray-100 hover:border-transparent">
                    {/* Thumbnail */}
                    <div
                      className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} flex flex-col items-center justify-center relative overflow-hidden gap-4 px-6`}
                    >
                      <BookOpen
                        size={48}
                        className="text-white opacity-20 absolute"
                      />

                      {/* Playing animation bars */}
                      {isPlaying && (
                        <div className="flex items-end gap-1 z-10 mb-2">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className="w-1 bg-white rounded-full animate-bounce"
                              style={{
                                height: `${10 + bar * 5}px`,
                                animationDelay: `${bar * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Audio player — visible, synced with button */}
                      <audio
                        ref={(el) => (audioRefs.current[sermon.id] = el)}
                        controls
                        className="w-full max-w-sm z-10"
                        onPlay={() => {
                          // Pause all other audios when user hits play on the native control
                          Object.entries(audioRefs.current).forEach(
                            ([id, audio]) => {
                              if (Number(id) !== sermon.id && audio) {
                                audio.pause();
                              }
                            },
                          );
                          setPlayingId(sermon.id);
                        }}
                        onPause={() => setPlayingId(null)}
                        onEnded={() => setPlayingId(null)}
                      >
                        <source
                          src={`${MEDIA_BASE_URL}${sermon.audio.url}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-700 transition">
                        {sermon.title}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-purple-400" />
                          {new Date(sermon.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {sermon.description?.[0]?.children?.[0]?.text}
                      </p>

                      <button
                        onClick={() => handleListenNow(sermon.id)}
                        className="flex items-center space-x-2 text-blue-600 font-bold hover:text-purple-600 transition group/btn"
                      >
                        {isPlaying ? (
                          <>
                            <Pause size={18} />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Headphones size={18} />
                            <span>Listen Now</span>
                            <ChevronRight
                              size={16}
                              className="group-hover/btn:translate-x-1 transition"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-slate-900 text-white rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15" />
            <div className="relative">
              <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-6">
                <Bell size={36} className="text-cyan-300" />
              </div>
              <h2 className="text-4xl font-black mb-4">
                Subscribe to Our Messages
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Get notified when new sermons are released and never miss a
                transforming word
              </p>
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition text-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SermonsPage;
