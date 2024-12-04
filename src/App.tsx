import React, { useEffect } from "react";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import {
  startPageTracking,
  endPageTracking,
  getAnalyticsSummary,
} from "./utils/analytics";

const App: React.FC = () => {
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>; // Declare interval ID outside

    // Start tracking when component mounts
    startPageTracking("home");

    // Set up analytics check with initial delay
    const analyticsTimer = setTimeout(() => {
      // First check
      endPageTracking();
      getAnalyticsSummary();

      // Start interval immediately after first check
      intervalId = setInterval(() => {
        console.log(
          "Analytics interval triggered at:",
          new Date().toLocaleTimeString()
        );
        endPageTracking();
        getAnalyticsSummary();
        startPageTracking("home");
      }, 15000);
    }, 11000);

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
      clearTimeout(analyticsTimer);
      endPageTracking();
      getAnalyticsSummary();
    };
  }, []);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Navbar />
        <Hero />
        <Features />
        <CallToAction />
        <Contact />
        <Footer />
      </div>
    </UserProvider>
  );
};

export default App;
