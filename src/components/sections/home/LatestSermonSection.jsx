import { ChevronRight, Calendar, Headphones } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SermonImg } from "../../../assets";
import { useNavigate } from "react-router-dom";
import sermonService from "../../../services/sermons";
import { MEDIA_BASE_URL } from "../../../services/api";

function LatestSermonSection() {
  const navigateTo = useNavigate();
  const [latestSermon, setLatestSermon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestSermon = async () => {
      try {
        const data = await sermonService.getAllSermons();
        const sermons = data?.data || [];

        // Sort by date descending and pick the most recent
        const sorted = sermons.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setLatestSermon(sorted[0] || null);
      } catch (error) {
        console.error("Failed to fetch sermons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestSermon();
  }, []);

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            Latest Sermon
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful messages transforming lives and shifting destinies
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition hover:-translate-y-2">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left image */}
            <div
              style={{
                backgroundImage: `url(${SermonImg})`,
              }}
              className="md:col-span-2 h-80 md:h-auto bg-cover bg-center flex items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 via-blue-900/40 to-purple-900/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/10 transition" />
            </div>

            {/* Right content */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-800 to-slate-900">
              <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3">
                🔥 Latest Message
              </span>

              {loading ? (
                <p className="text-gray-400 text-lg">Loading...</p>
              ) : latestSermon ? (
                <>
                  <h3 className="text-4xl font-black text-white mb-3 leading-tight">
                    {latestSermon.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <Calendar size={14} className="text-cyan-400" />
                    {new Date(latestSermon.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {latestSermon.description?.[0]?.children?.[0]?.text}
                  </p>

                  {/* Audio player */}
                  {latestSermon.audio?.url && (
                    <div className="mb-8">
                      <audio controls className="w-full max-w-md">
                        <source
                          src={`${MEDIA_BASE_URL}${latestSermon.audio.url}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-4xl font-black text-white mb-4">
                    Coming Soon
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Stay tuned for our latest sermon series. We are regularly
                    sharing powerful messages of transformation and spiritual
                    growth to equip you in your journey of faith.
                  </p>
                </>
              )}

              <button
                onClick={() => navigateTo("/sermons")}
                className="text-cyan-400 font-bold flex items-center space-x-2 transition text-lg group w-fit hover:text-purple-400"
              >
                <Headphones size={20} />
                <span>Listen to All Messages</span>
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-1 transition"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestSermonSection;
