import React from "react";
import { useUser } from "../contexts/UserContext";
import { Globe2, Clock, MapPin } from "lucide-react";

const UserInfo: React.FC = () => {
  const userData = useUser();

  // Format coordinates to be more readable
  const formatCoordinates = (lat: number, long: number) => {
    return `${lat.toFixed(4)}°, ${long.toFixed(4)}°`;
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-end space-x-6 text-sm text-gray-500">
          {/* Language Display */}
          <div className="flex items-center">
            <Globe2 className="h-4 w-4 mr-1" />
            <span>
              {userData.language.browserLanguage || "Language not detected"}
            </span>
          </div>

          {/* Time of Day Display */}
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {userData.session.timeOfDay || "Time not available"} (
              {userData.session.timezone})
            </span>
          </div>

          {/* Location Display */}
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {userData.location.coordinates ? (
              <span>
                {formatCoordinates(
                  userData.location.coordinates.latitude,
                  userData.location.coordinates.longitude
                )}
              </span>
            ) : (
              <span className="flex items-center">
                {userData.location.error ? (
                  <span className="text-red-500">
                    {userData.location.error}
                  </span>
                ) : (
                  <>
                    <span className="animate-pulse mr-2">●</span>
                    Requesting location...
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
