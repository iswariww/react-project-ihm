declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const initializeGTM = () => {
  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // GTM initialization script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-5Z93KJP3`;

  document.head.appendChild(script);

  console.log("GTM initialized:", {
    exists: !!window.dataLayer,
    content: window.dataLayer,
  });
};
