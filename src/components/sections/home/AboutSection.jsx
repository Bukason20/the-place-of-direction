import { ChevronRight, Heart, Users, Zap } from "lucide-react";
import React from "react";
import { AboutImg } from "../../../assets";

const values = [
  {
    icon: <Heart className="w-12 h-12 text-red-500" />,
    title: "Our Mission",
    desc: "To teach and model the voice of God as the compass of life — raising men and women who live by definite instructions from Scripture and Spirit.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <Users className="w-12 h-12 text-blue-500" />,
    title: "Our Vision",
    desc: "To be a prophetic hub where destinies are realigned, voices are sharpened, and nations are guided into God's eternal blueprint.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    title: "Prophetic Mandate",
    desc: "To raise a people who walk in clarity, live in alignment, and fulfill destiny under the Shepherd's voice.",
    color: "from-yellow-500 to-orange-500",
  },
];

function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            The Place of Direction
          </h2>
          <p className="text-blue-600 italic text-base mb-6 font-medium">
            "And thine ears shall hear a word behind thee, saying, This is the
            way, walk ye in it…" Isaiah 30:21
          </p>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            We are a prophetic and apostolic movement established on one
            unwavering conviction — that God still speaks, and His voice is the
            only reliable compass for life. At The Place of Direction, we exist
            to help every believer hear clearly, align completely, and walk
            boldly in the path God has ordained.
          </p>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            We build altars of prayer and fasting where confusion yields to
            clarity. We equip men and women with prophetic wisdom for family,
            career, ministry, and nations — and we are committed to establishing
            a generational legacy of people who refuse to walk without divine
            instruction.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition flex items-center space-x-2">
            <span>Learn More About Us</span>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-96 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={AboutImg}
            alt="The Place of Direction"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="relative py-10 overflow-hidden">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition duration-500`}
              />
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-sm transition duration-500 border border-gray-100 hover:border-transparent">
                <div
                  className={`bg-clip-text bg-gradient-to-r ${item.color} mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
