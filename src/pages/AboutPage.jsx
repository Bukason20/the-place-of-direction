import {
  ChevronRight,
  Eye,
  Target,
  Shield,
  Users,
  Zap,
  Crown,
  Star,
} from "lucide-react";
import React from "react";
import { HeroBg, AboutImg } from "../assets";
import Navbar from "../components/Navbar";

const AboutPage = () => {
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
        {/* Semi-transparent overlay — image shows through but text is readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/65 via-purple-900/55 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40 pb-24">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-4">
            Who We Are
          </span>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            About Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Movement
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-light drop-shadow-lg">
            Discover the vision, mission, and heart behind Ecclesia Life
            Empowerment Ministries
          </p>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Vision */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To establish a prophetic and apostolic movement that brings
                  restoration, direction, and undiluted God's word to men. We
                  envision a generation of purpose-driven men walking in their
                  God-given destiny and impacting their spheres of influence
                  with excellence and integrity.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-10 border-l-4 border-purple-600 shadow-lg hover:shadow-xl transition h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Target size={24} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To give direction to men, discover and nurture gifted
                  individuals, and equip them to fulfill their divine calling.
                  Through prophetic guidance and apostolic teachings, we empower
                  men to become catalysts of change in their communities and
                  nations.
                </p>
              </div>
            </div>
          </div>

          {/* ── CORE VALUES ── */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-3">
                What We Stand For
              </span>
              <h2 className="text-5xl font-black text-gray-900">Core Values</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Prophetic",
                  desc: "Speaking truth and direction",
                  icon: <Star size={28} className="text-white" />,
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  title: "Apostolic",
                  desc: "Foundational leadership & authority",
                  icon: <Crown size={28} className="text-white" />,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Empowerment",
                  desc: "Raising purpose-driven men",
                  icon: <Zap size={28} className="text-white" />,
                  color: "from-red-500 to-pink-500",
                },
                {
                  title: "Integrity",
                  desc: "Undiluted God's word always",
                  icon: <Shield size={28} className="text-white" />,
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((val, i) => (
                <div key={i} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${val.color} rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition duration-500`}
                  />
                  <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center border border-gray-100 hover:border-transparent h-full">
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br ${val.color} rounded-xl mb-4`}
                    >
                      {val.icon}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── OUR STORY ── */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10" />
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                    <Users size={22} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-white">Our Story</h2>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  Ecclesia Life Empowerment Ministries was founded on the
                  conviction that every man has a God-given purpose and destiny.
                  Born from a passion to see men discover, develop, and fulfill
                  their divine calling, our ministry has grown into a thriving
                  prophetic and apostolic movement.
                </p>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Based in Port Harcourt, Nigeria, we are committed to raising a
                  generation of men who walk with integrity, speak with
                  authority, and lead with purpose. Our foundation is built on
                  God's word, and our direction comes from the prophetic voice
                  of the Holy Spirit.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={AboutImg}
                  alt="About Ecclesia Life Empowerment Ministries"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-5xl font-black mb-4">Be Part of the Movement</h2>
          <p className="text-blue-200 text-xl mb-10">
            Join a community of purpose-driven men walking in their God-given
            destiny
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition text-lg">
            <span>Get Involved</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
