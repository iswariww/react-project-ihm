import React from "react";

// Define the Navbar component
const Navbar: React.FC = () => {
  // Function to handle click events on navbar elements
  const handleClick = (name: string, type: string) => {
    // Create an event data object for Google Tag Manager (GTM)
    const eventData = {
      event: "click", // Event type
      elementName: name, // Name of the element clicked
      elementType: type, // Type of element (e.g., "nav_link")
    };
    // Push the event data to the GTM dataLayer if it exists
    window.dataLayer?.push(eventData);
    console.log("GTM Event pushed:", eventData);
  };

  // Render the Navbar
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo with click event handler */}
              <span
                className="text-xl font-semibold text-indigo-600"
                onClick={() => handleClick("TechNova Logo", "nav_link")}
                style={{ cursor: "pointer" }}
              >
                TechNova
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {/* Navigation links with click event handlers */}
            {/* Tracks user navigation to the About section */}
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => handleClick("About", "nav_link")}
            >
              About
            </a>
            {/* Tracks user navigation to the Features section */}
            <a
              href="#features"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => handleClick("Features", "nav_link")}
            >
              Features
            </a>
            {/* Tracks user navigation to the Contact section */}
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => handleClick("Contact", "nav_link")}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component as default
export default Navbar;
