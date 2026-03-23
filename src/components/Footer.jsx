import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer>
      {/* Contact Section */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-900/80 to-slate-900 text-white py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-20 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-5xl font-black mb-12">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black mb-1 text-lg">Our Location</h3>
                    <p className="text-gray-300 leading-relaxed">
                      4 Nwokaocha Street, off Omachi, Eliowani. Opposite Diliosa
                      Hotel Annex, Rumuodara, Port Harcourt, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black mb-1 text-lg">Phone</h3>
                    <p className="text-gray-300">
                      Contact us for more information
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black mb-1 text-lg">Email</h3>
                    <p className="text-gray-300">hello@ecclesiastia.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-sm"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-sm resize-none"
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-black py-3 rounded-lg hover:shadow-2xl transition text-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-700 pt-12 flex justify-center space-x-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition hover:scale-125 duration-300"
            >
              <Facebook size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition hover:scale-125 duration-300"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition hover:scale-125 duration-300"
            >
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Copyright Footer */}
      <div className="bg-black text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-bold">
            © 2025 Ecclesia Life Empowerment Ministries. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Built with faith, purpose, and excellence 🙏
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
