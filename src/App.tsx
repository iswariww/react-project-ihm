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
    // Start tracking main page
    startPageTracking("home");

    // Set up cleanup
    return () => {
      endPageTracking();
      // Log summary when component unmounts
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
