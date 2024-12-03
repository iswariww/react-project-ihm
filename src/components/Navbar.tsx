import React from "react";

const Navbar: React.FC = () => {
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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
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
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => handleClick("About", "nav_link")}
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => handleClick("Features", "nav_link")}
            >
              Features
            </a>
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

export default Navbar;
