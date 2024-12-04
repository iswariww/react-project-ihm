import React from "react";
import { trackButtonClick, CTAButtons } from "../utils/analytics";

const CallToAction: React.FC = () => {
  const handleClick = (buttonName: string) => {
    // Track the button click using our analytics
    trackButtonClick(buttonName);

    // Keep the existing GTM push
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
    <div className="bg-indigo-50 py-24 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to elevate your digital presence?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Join the digital revolution with TechNova's innovative solutions and
            transform your business today.
          </p>
          <div className="mt-8">
            <button
              onClick={() => handleClick(CTAButtons.START_TRIAL)}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
