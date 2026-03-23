import React from "react";
import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigateTo = useNavigate();

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 text-white py-24 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl sm:text-6xl font-black mb-6">
          Ready to Transform?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
          Join us on a journey of discovery, growth, and purpose fulfillment
        </p>
        <button
          onClick={() => navigateTo("events")}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 px-10 py-4 rounded-lg font-bold hover:shadow-2xl transition text-lg"
        >
          Explore Upcoming Events
        </button>
      </div>
    </section>
  );
}

export default CTASection;
