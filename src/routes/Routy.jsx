import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SermonsPage from "../pages/SermonsPage";
import EventsPage from "../pages/EventsPage";
import OneonOnePage from "../pages/OneonOnePage";
import ShopPage from "../pages/ShopPage";
import Navbar from "../components/Navbar";

function Routy() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/one-on-one" element={<OneonOnePage />} />
            <Route path="/shop" element={<ShopPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Routy;
