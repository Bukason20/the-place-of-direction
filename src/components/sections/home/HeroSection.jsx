import { Calendar, ChevronRight } from "lucide-react";
import React from "react";
import { HeroBg } from "../../../assets";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";

const heroDetails = [
  { day: "SATURDAY", meeting: "Service", time: "7:30 AM" },
  { day: "TUESDAY", meeting: "Midweek Apostolic Refill", time: "5:20 PM" },
  { day: "SATURDAY", meeting: "Service", time: "7:00 AM" },
];

function HeroSection() {
  const navigateTo = useNavigate();

  return (
    <section className="relative text-white overflow-hidden min-h-[100vh] flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 58, 138, 0.6) 50%, rgba(88, 28, 135, 0.4) 100%), url(${HeroBg})`,
          backgroundColor: "#1e3a8a",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative flex-1 flex items-center pb-24 pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-5xl font-black mb-6 leading-tight drop-shadow-2xl tracking-tight">
            Direction, Restoration &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Divine Purpose
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-100 mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-light">
            A Prophetic & Apostolic Movement raising purpose-driven men into
            their God-given destiny
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-3">
            <button
              onClick={() => navigateTo("events")}
              className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl hover:scale-105 transition transform text-lg flex items-center justify-center space-x-2 backdrop-blur-sm"
            >
              <Calendar size={22} />
              <span>Upcoming Events</span>
              <ChevronRight
                size={22}
                className="group-hover:translate-x-1 transition"
              />
            </button>
            <button
              onClick={() => navigateTo("about")}
              className="border-2 border-white/60 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 hover:border-white hover:shadow-2xl hover:scale-105 transition transform text-lg backdrop-blur-sm"
            >
              Learn Our Vision
            </button>
          </div>

          <div className="bg-transparent backdrop-blur-md max-w-[70%] mx-auto mt-10 rounded-2xl shadow-2xl py-8 px-12">
            <h3 className="font-bold text-purple-400 mb-5">
              Join Us This Week
            </h3>
            <div className="flex justify-between">
              {heroDetails.map((detail, i) => (
                <div key={i}>
                  <h6 className="font-extrabold text-sm bg-gradient-to-r from-cyan-200 to-blue-300 text-transparent bg-clip-text">
                    {detail.day}
                  </h6>
                  <p className="my-1 text-lg">{detail.meeting}</p>
                  <p className="text-yellow-400">{detail.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
