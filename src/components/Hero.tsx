import React from "react";
import { trackButtonClick, CTAButtons } from "../utils/analytics";

const Hero: React.FC = () => {
  const handleClick = (buttonName: string) => {
    // Use our analytics tracking
    trackButtonClick(buttonName);

    // Keep the existing GTM push for backwards compatibility
    const eventData = {
      event: "click",
      elementName: buttonName,
      elementType: "cta_button",
    };

    if (window.dataLayer) {
      window.dataLayer.push(eventData);
      console.log("GTM Event pushed:", eventData);
    } else {
      console.warn("GTM dataLayer not found");
    }
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to </span>
                <span className="block text-indigo-600 xl:inline">
                  TechNova
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Empowering your digital journey with cutting-edge solutions.
                Discover how TechNova can transform your business and boost your
                productivity.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => handleClick(CTAButtons.GET_STARTED)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => handleClick(CTAButtons.LEARN_MORE)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
