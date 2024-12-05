import React from "react";

// Define the Footer component
const Footer: React.FC = () => {
  // Handler for tracking social media link clicks using Google Tag Manager (GTM)
  const handleClick = (name: string, type: string) => {
    // Create an event data object for Google Tag Manager (GTM)
    const eventData = {
      event: "click",
      elementName: name, // Name of the social media platform
      elementType: type, // Type of element (social_link in this case)
    };
    // Push the event data to the GTM dataLayer if it exists
    window.dataLayer?.push(eventData);
    console.log("GTM Event pushed:", eventData);
  };

  return (
    <footer className="bg-gray-100">
      {/* Main footer container with responsive padding and max width */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        {/* Social media links section */}
        <div className="flex justify-center space-x-6 md:order-2">
          {/* Facebook link */}
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500"
            onClick={() => handleClick("Facebook", "social_link")}
          >
            <span className="sr-only">Facebook</span>
            {/* SVG icon for Facebook */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* X link */}
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500"
            onClick={() => handleClick("X", "social_link")}
          >
            <span className="sr-only">X</span>
            {/* SVG icon for X */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
            </svg>
          </a>

          {/* GitHub link */}
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500"
            onClick={() => handleClick("GitHub", "social_link")}
          >
            <span className="sr-only">GitHub</span>
            {/* SVG icon for GitHub */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* LinkedIn link */}
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500"
            onClick={() => handleClick("LinkedIn", "social_link")}
          >
            <span className="sr-only">LinkedIn</span>
            {/* SVG icon for LinkedIn */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM8.063 9.802h-2.7V18h2.7V9.802zm-1.35-4.307c-.96 0-1.575.664-1.575 1.505 0 .827.6 1.505 1.53 1.505h.017c.963 0 1.575-.678 1.575-1.505-.018-.84-.612-1.505-1.547-1.505zM18 18h-2.7v-4.39c0-1.093-.39-1.838-1.372-1.838-.748 0-1.194.503-1.39.99-.072.175-.09.42-.09.665V18h-2.7s.036-7.393 0-8.198h2.7v1.16c.36-.557 1.004-1.35 2.44-1.35 1.782 0 3.112 1.164 3.112 3.666V18z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        {/* Copyright text container */}
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 TechNova, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
