import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { HeroBg } from "../assets";
import Navbar from "../components/Navbar";
import eventService from "../services/events";
import { MEDIA_BASE_URL } from "../services/api";

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-cyan-500 to-teal-500",
];

const formatTime = (timeStr) => {
  if (!timeStr) return "TBA";
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minute} ${ampm}`;
};

function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllSermons();
        setAllEvents(data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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

        <div className="absolute top-0 left-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40 pb-24">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4">
            What's Coming
          </span>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            Upcoming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Events
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light drop-shadow-lg">
            Join us for life-changing gatherings and divine encounters
          </p>
        </div>
      </section>

      {/* ── EVENTS GRID ── */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-20 text-gray-400 text-lg font-medium">
              Loading events...
            </div>
          )}

          {!loading && allEvents.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-lg font-medium">
              No upcoming events at the moment. Check back soon!
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {allEvents.map((event, index) => {
              const gradient = gradients[index % gradients.length];
              const imageUrl =
                event.image?.formats?.large?.url ||
                event.image?.formats?.medium?.url ||
                event.image?.url;

              return (
                <div key={event.id} className="group relative h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition duration-500`}
                  />
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 h-full flex flex-col border border-gray-100 hover:border-transparent">
                    {/* Top Color Bar */}
                    <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                    {/* Event Image */}
                    <div className="h-52 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={`${MEDIA_BASE_URL}${imageUrl}`}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${gradient}`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:translate-x-1 transition">
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-gray-700">
                          <Calendar
                            size={18}
                            className="text-blue-500 flex-shrink-0"
                          />
                          <span className="font-semibold">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <Clock
                            size={18}
                            className="text-purple-500 flex-shrink-0"
                          />
                          <span className="font-semibold">
                            {formatTime(event.start_time)} —{" "}
                            {formatTime(event.end_time)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <MapPin
                            size={18}
                            className="text-cyan-500 flex-shrink-0"
                          />
                          <span className="font-semibold capitalize">
                            {event.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                        {event.description?.[0]?.children?.[0]?.text}
                      </p>

                      <button
                        className={`group/btn bg-gradient-to-r ${gradient} text-white font-bold py-3 rounded-lg hover:shadow-lg transition flex items-center justify-center space-x-2 w-full`}
                      >
                        <span>Register Now</span>
                        <ArrowRight
                          size={18}
                          className="group-hover/btn:translate-x-1 transition"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15" />
            <div className="relative">
              <h2 className="text-4xl font-black mb-4">Don't Miss Out</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Subscribe to our event notifications and be the first to know
                about upcoming gatherings
              </p>
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition text-lg">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventsPage;
