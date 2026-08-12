import {
  Users,
  ChevronRight,
  Target,
  Sparkles,
  Compass,
  Award,
  User,
  Briefcase,
  CalendarClock,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroBg } from "../assets";
import Navbar from "../components/Navbar";

const OneonOnePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden min-h-[60vh] flex flex-col justify-center">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroBg})` }}
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/65 via-purple-900/55 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40 pb-24">
          {/* Annual program banner */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2 mb-6">
            <CalendarClock size={16} className="text-cyan-300" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-300">
              An Annual Prophetic Program
            </span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            One-on-One{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Mentoring
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light drop-shadow-lg">
            A prophetic mentoring program designed to give you the word of the
            Lord and direction in your life, your family, and your business.
          </p>
          <p className="text-lg text-cyan-200 max-w-2xl mx-auto font-medium mt-4">
            Choose one or all of the programs as you are led — and hear the
            voice of the Lord.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── INTRO GRID ── */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-3">
                What It Is
              </span>
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Prophetic Direction, Once a Year
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Once a year, we open the doors to One-on-One — a season set
                apart to sit before the Lord with one of our leaders and receive
                prophetic direction that is specific to you. Whether it's
                clarity for your personal life, covering for your family, or
                direction for your business, this is a moment to pause and hear
                what the Lord is saying over the next season of your life.
              </p>

              <button
                onClick={() => navigate("/one-on-one/register")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition text-lg"
              >
                <span>Schedule a Session</span>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Illustration card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition duration-500" />
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 h-96 rounded-2xl flex items-center justify-center shadow-xl border border-blue-100">
                <div className="text-center">
                  <div className="inline-flex p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-2xl">
                    <Sparkles size={64} className="text-white" />
                  </div>
                  <p className="text-gray-700 font-black text-xl">
                    Hear the Voice of the Lord
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Direction for this next season
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── THE THREE PROGRAMS ── */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 rounded-3xl p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />

            <div className="relative">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-3">
                  Choose Your Track
                </span>
                <h2 className="text-4xl font-black text-white mb-3">
                  Three Programs, One Word
                </h2>
                <p className="text-blue-200 max-w-2xl mx-auto">
                  You're welcome to register for one — or all three, as the Lord
                  leads you.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <User size={40} className="text-cyan-300" />,
                    title: "Personal",
                    desc: "One-on-one time to receive direction for your own life, purpose, and the season ahead.",
                    color: "from-cyan-500/20 to-blue-500/20",
                    border: "border-cyan-500/30",
                  },
                  {
                    icon: <Users size={40} className="text-purple-300" />,
                    title: "Family",
                    desc: "Prophetic covering and direction for you and your household — nuclear family included.",
                    color: "from-purple-500/20 to-pink-500/20",
                    border: "border-purple-500/30",
                  },
                  {
                    icon: <Briefcase size={40} className="text-yellow-300" />,
                    title: "Business",
                    desc: "Direction for your business or organization, whether you're an SME or a larger corporate team.",
                    color: "from-yellow-500/20 to-orange-500/20",
                    border: "border-yellow-500/30",
                  },
                ].map((program, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${program.color} border ${program.border} rounded-2xl p-8 text-center hover:scale-105 transition duration-300`}
                  >
                    <div className="flex justify-center mb-4">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {program.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-3">
                Process
              </span>
              <h2 className="text-5xl font-black text-gray-900">
                How It Works
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: <Target size={28} className="text-white" />,
                  title: "Register",
                  desc: "Choose your track — Personal, Family, or Business — and complete a short registration form.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "02",
                  icon: <Compass size={28} className="text-white" />,
                  title: "Meet Your Leader",
                  desc: "Sit one-on-one with a leader at your preferred location for this year's program.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "03",
                  icon: <Award size={28} className="text-white" />,
                  title: "Receive Direction",
                  desc: "Walk away with prophetic direction and clarity for the season ahead.",
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((step, i) => (
                <div key={i} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500`}
                  />
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 hover:border-transparent transition h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${step.color} rounded-xl shadow-md`}
                      >
                        {step.icon}
                      </div>
                      <span
                        className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.color} opacity-30`}
                      >
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-5xl font-black mb-4">Ready to Begin?</h2>
          <p className="text-blue-200 text-xl mb-10">
            Choose your track and take the first step toward hearing the voice
            of the Lord for this season.
          </p>
          <button
            onClick={() => navigate("/one-on-one/register")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition text-lg"
          >
            <span>Schedule a Session</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default OneonOnePage;
