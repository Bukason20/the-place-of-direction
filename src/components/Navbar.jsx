import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "../assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Triggers when user scrolls past 80% of the viewport height (roughly past the hero)
      const heroHeight = window.innerHeight * 0.3;
      // console.log(heroHeight);

      // console.log(window.scrollY);
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/sermons", label: "Sermons" },
    { path: "/events", label: "Events" },
    { path: "/one-on-one", label: "1-on-1" },
    { path: "/shop", label: "Shop" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <img src={Logo} alt="" width="50px" />
            <p
              className={`font-black hidden sm:inline text-left transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              The Place <br /> of Direction
            </p>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition">
            Get Involved
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 ${
              scrolled ? "bg-white" : ""
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-bold transition ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label === "1-on-1" ? "1-on-1 Mentoring" : item.label}
              </button>
            ))}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-bold mt-2 hover:shadow-lg transition">
              Get Involved
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
