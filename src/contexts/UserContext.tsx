/**
 * UserContext
 *
 * This file defines a React context for managing and providing user-specific data throughout the application.
 *
 * The context provides information such as:
 * - Browser language
 * - Local time and timezone
 * - Geographic location (coordinates)
 *
 * This setup allows components to access and display user-specific information easily.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

// Define the shape of the user data
interface UserContextType {
  location: {
    coordinates: { latitude: number; longitude: number } | null;
    error: string | null;
  };
  language: {
    browserLanguage: string;
    systemLanguage: string;
  };
  session: {
    startTime: Date;
    timeOfDay: string;
    timezone: string;
  };
}

// Create the UserContext with an undefined default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper function to get time of day
const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 16) return "Afternoon";
  if (hour >= 16 && hour < 20) return "Evening";
  return "Night";
};

// Helper function to initialize user data
const initializeUserData = (): UserContextType => ({
  location: { coordinates: null, error: null },
  language: {
    browserLanguage: navigator.language || "en",
    systemLanguage: navigator.language || "en",
  },
  session: {
    startTime: new Date(),
    timeOfDay: getTimeOfDay(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
});

// Function to request location permission and get the user's location
const requestLocationPermission = async () => {
  try {
    // First, check if geolocation is available
    if (!("geolocation" in navigator)) {
      throw new Error("Geolocation is not supported by your browser");
    }

    // Check for permissions
    if ("permissions" in navigator) {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        throw new Error("Location permission was denied");
      }
    }

    // Request location
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });
  } catch (error) {
    console.error("Error requesting location:", error);
    throw error;
  }
};

// UserProvider component to wrap the application and provide user data
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserContextType>(
    initializeUserData()
  );
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeLocation = async () => {
      try {
        const position =
          (await requestLocationPermission()) as GeolocationPosition;

        const newCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setUserData((prev) => ({
          ...prev,
          location: {
            coordinates: newCoordinates,
            error: null,
          },
        }));

        console.log("User Location:", newCoordinates);

        window.dataLayer?.push({
          event: "user_location",
          userLatitude: newCoordinates.latitude,
          userLongitude: newCoordinates.longitude,
        });
      } catch (error: any) {
        console.log("Location Error:", error.message);
      }
    };

    initializeLocation();

    // Log user data once
    console.log("User Language:", userData.language.browserLanguage);
    console.log("User Time of Day:", userData.session.timeOfDay);
    console.log("User Timezone:", userData.session.timezone);
    console.log(
      "User Local Time:",
      userData.session.startTime.toLocaleTimeString()
    );
  }, []); // Empty dependency array means this runs once on mount

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

// Custom hook to use user data
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
