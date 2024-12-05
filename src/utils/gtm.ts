/**
 * Google Tag Manager (GTM) Initialization Module
 *
 * This module handles the initialization and setup of Google Tag Manager in the application.
 * It provides:
 * - Type declaration for GTM's dataLayer
 * - Initialization function for GTM script
 * - Automatic dataLayer creation if not exists
 *
 * The GTM configuration uses the container ID: GTM-5Z93KJP3
 *
 * Usage:
 * Import and call initializeGTM() in your application's entry point
 * to enable GTM tracking capabilities.
 */

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[]; // Define dataLayer as a property of the window object
  }
}

// Function to initialize Google Tag Manager
export const initializeGTM = () => {
  // Initialize dataLayer array if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Create and configure the GTM script element
  const script = document.createElement("script");
  script.async = true; // Load script asynchronously
  script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-5Z93KJP3`; // GTM source with container ID

  // Add the GTM script to the document head
  document.head.appendChild(script);

  // Log initialization status for debugging
  console.log("GTM initialized:", {
    exists: !!window.dataLayer, // Check if dataLayer exists
    content: window.dataLayer, // Log current dataLayer content
  });
};
