import {
  Users,
  ChevronRight,
  Target,
  TrendingUp,
  CheckCircle,
  Compass,
  Award,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { HeroBg } from "../assets";
import Navbar from "../components/Navbar";

const OneonOnePage = () => {
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
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Personal Growth
          </span>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            One-on-One{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Mentoring
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light drop-shadow-lg">
            Personalized guidance for your journey of purpose
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
                Tailored For You
              </span>
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Personalized Mentoring
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Experience personalized mentoring designed specifically for you.
                Our experienced leaders provide one-on-one guidance to help you
                discover your purpose, overcome obstacles, and step into your
                God-given destiny.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Purpose Discovery",
                  "Spiritual Growth",
                  "Leadership Development",
                  "Life Direction",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-4 text-gray-700"
                  >
                    <CheckCircle
                      size={20}
                      className="text-blue-600 flex-shrink-0"
                    />
                    <span className="font-bold text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition text-lg">
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
                    <Users size={64} className="text-white" />
                  </div>
                  <p className="text-gray-700 font-black text-xl">
                    Transform Your Life
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    One conversation at a time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── WHAT YOU'LL GAIN ── */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 rounded-3xl p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />

            <div className="relative">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-3">
                  Benefits
                </span>
                <h2 className="text-4xl font-black text-white">
                  What You'll Gain
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Compass size={40} className="text-cyan-300" />,
                    title: "Clear Direction",
                    desc: "Gain clarity on your purpose and your very next steps forward",
                    color: "from-cyan-500/20 to-blue-500/20",
                    border: "border-cyan-500/30",
                  },
                  {
                    icon: <TrendingUp size={40} className="text-purple-300" />,
                    title: "Personal Growth",
                    desc: "Develop your character, leadership, and spiritual depth",
                    color: "from-purple-500/20 to-pink-500/20",
                    border: "border-purple-500/30",
                  },
                  {
                    icon: <ShieldCheck size={40} className="text-yellow-300" />,
                    title: "Accountability",
                    desc: "Consistent support and accountability to help you achieve your goals",
                    color: "from-yellow-500/20 to-orange-500/20",
                    border: "border-yellow-500/30",
                  },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${benefit.color} border ${benefit.border} rounded-2xl p-8 text-center hover:scale-105 transition duration-300`}
                  >
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {benefit.desc}
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
                  title: "Book a Session",
                  desc: "Reach out to schedule your first one-on-one mentoring session with one of our leaders.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "02",
                  icon: <Users size={28} className="text-white" />,
                  title: "Meet Your Mentor",
                  desc: "Connect personally with an experienced leader who will walk alongside you.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "03",
                  icon: <Award size={28} className="text-white" />,
                  title: "Step Into Destiny",
                  desc: "Receive guidance, accountability, and prophetic direction for your unique journey.",
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
            Take the first step toward discovering your God-given destiny
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition text-lg">
            <span>Schedule a Session</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default OneonOnePage;
