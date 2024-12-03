import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

const App: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log("GTM dataLayer status:", {
      exists: !!window.dataLayer,
      content: window.dataLayer,
    });

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const deviceEvent = {
      event: "device_type",
      deviceType: isMobile ? "mobile" : "desktop",
    };

    if (window.dataLayer) {
      window.dataLayer.push(deviceEvent);
      console.log("GTM Device Event pushed:", deviceEvent);
    } else {
      console.warn("GTM dataLayer not found");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
