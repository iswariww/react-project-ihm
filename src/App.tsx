import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

const App: React.FC = () => {
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
