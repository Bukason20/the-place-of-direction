import React from "react";
import HeroSection from "../components/sections/home/HeroSection";
import AboutSection from "../components/sections/home/AboutSection";
import UpcomingEventsSection from "../components/sections/home/UpcomingEventsSection";
import LatestSermonSection from "../components/sections/home/LatestSermonSection";
import CTASection from "../components/sections/home/CtaSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <UpcomingEventsSection />
      <LatestSermonSection />
      <CTASection />
    </>
  );
}

export default HomePage;
