import React from "react";

const CallToAction: React.FC = () => {
  const handleClick = (name: string, type: string) => {
    const eventData = {
      event: "click",
      elementName: name,
      elementType: type,
    };
    window.dataLayer?.push(eventData);
    console.log("GTM Event pushed:", eventData);
  };

  return (
    <div className="bg-indigo-600">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-8">
          Ready to revolutionize your business?
        </h2>
        <p className="mt-4 text-xl leading-6 text-indigo-100 mb-8">
          Experience the power of TechNova with our 30-day risk-free trial and
          transform your operations.
        </p>
        <a
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          onClick={() => handleClick("Start free trial", "cta_button")}
        >
          Start free trial
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
