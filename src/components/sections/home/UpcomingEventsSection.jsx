import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../../../services/events";

const formatTime = (timeStr) => {
  if (!timeStr) return "TBA";
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minute} ${ampm}`;
};

const isFutureEvent = (event) => {
  const eventDate = new Date(event.date);
  const today = new Date();

  // If event date is in the future, it's valid
  if (eventDate > today) return true;

  // If event date is today, check if start time has not passed
  const isToday = eventDate.toDateString() === today.toDateString();

  if (isToday && event.start_time) {
    const [hour, minute] = event.start_time.split(":");
    const eventDateTime = new Date();
    eventDateTime.setHours(parseInt(hour), parseInt(minute), 0, 0);
    return eventDateTime > today;
  }

  return false;
};

function UpcomingEventsSection() {
  const navigateTo = useNavigate();
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [sideEvents, setSideEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllSermons();
        const allEvents = data?.data || [];

        // Filter to only future/ongoing events and sort by date ascending
        const futureEvents = allEvents
          .filter(isFutureEvent)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (futureEvents.length > 0) {
          setFeaturedEvent(futureEvents[0]);
          setSideEvents(futureEvents.slice(1, 4)); // up to 3 side events
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-24">
        <div className="text-center text-gray-400 text-lg font-medium">
          Loading events...
        </div>
      </section>
    );
  }

  if (!featuredEvent) {
    return (
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-3">
            What's Happening
          </span>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-5">
            Upcoming Events
          </h2>
          <p className="text-gray-400 text-lg mt-10">
            No upcoming events at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-3">
            What's Happening
          </span>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-5">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Gatherings designed to ignite purpose, deepen faith, and build
            community
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Featured event card */}
          <div
            className="lg:col-span-3 relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-purple-900 shadow-2xl flex flex-col min-h-[400px] group cursor-pointer"
            onClick={() => navigateTo("/events")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 group-hover:opacity-30 transition duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 group-hover:opacity-30 transition duration-700" />
            <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
              <span className="text-[260px] font-black text-white">✝</span>
            </div>

            <div className="relative flex flex-col flex-1 p-8 md:p-10 justify-end">
              <span className="inline-block self-start mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
                Featured Event
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight group-hover:text-cyan-200 transition">
                {featuredEvent.title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-lg">
                {featuredEvent.description?.[0]?.children?.[0]?.text}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-cyan-400" />
                  {new Date(featuredEvent.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-400" />
                  {formatTime(featuredEvent.start_time)} —{" "}
                  {formatTime(featuredEvent.end_time)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-purple-400" />
                  <span className="capitalize">{featuredEvent.location}</span>
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo("/events");
                }}
                className="self-start flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 hover:border-white/60 transition text-sm group/btn"
              >
                Learn More
                <ChevronRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition"
                />
              </button>
            </div>
          </div>

          {/* Side events list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {sideEvents.length > 0 ? (
              sideEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex-1 bg-white border border-gray-200 hover:border-blue-300 rounded-2xl p-6 flex gap-4 cursor-pointer hover:shadow-md transition duration-300 group"
                  onClick={() => navigateTo("/events")}
                >
                  <div className="w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 font-bold text-base mb-1 group-hover:text-blue-700 transition leading-snug">
                      {ev.title}
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(ev.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {formatTime(ev.start_time)} — {formatTime(ev.end_time)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {ev.description?.[0]?.children?.[0]?.text}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition flex-shrink-0 self-center"
                  />
                </div>
              ))
            ) : (
              <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center text-gray-400 text-sm text-center">
                No other upcoming events at the moment.
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigateTo("/events")}
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition text-base"
          >
            View All Events
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEventsSection;
