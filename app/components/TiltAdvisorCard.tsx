"use client";

import {
  FaLocationArrow,
  FaCompass,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

interface TiltAdvisorCardProps {
  currentTilt: number | null;
  optimalTilt: number | null;
  isLoading: boolean;
  error: string | null;
}

const TiltAdvisorCard = ({
  currentTilt,
  optimalTilt,
  isLoading,
  error,
}: TiltAdvisorCardProps) => {
  const getStatus = () => {
    if (isLoading) {
      return {
        icon: <FaSpinner className="h-6 w-6 animate-spin text-gray-500" />,
        message: "Getting location for optimal tilt...",
        color: "text-gray-500",
      };
    }
    
    if (error) {
       return {
        icon: <FaTimesCircle className="h-6 w-6 text-red-600" />,
        message: error,
        color: "text-red-600",
      };
    }

    if (currentTilt === null || optimalTilt === null) {
      return {
        icon: <FaSpinner className="h-6 w-6 animate-spin text-gray-500" />,
        message: "Waiting for panel data...",
        color: "text-gray-500",
      };
    }

    const diff = Math.abs(currentTilt - optimalTilt);

    if (diff <= 5) {
      return {
        icon: <FaCheckCircle className="h-6 w-6 text-green-600" />,
        message: "Excellent Alignment",
        color: "text-green-600",
      };
    } else if (diff <= 15) {
      return {
        icon: <FaExclamationTriangle className="h-6 w-6 text-yellow-600" />,
        message: "Slight Misalignment",
        color: "text-yellow-600",
      };
    } else {
      return {
        icon: <FaTimesCircle className="h-6 w-6 text-red-600" />,
        message: "Misalignment Detected",
        color: "text-red-600",
      };
    }
  };

  const status = getStatus();

  return (
    <div className="beautiful-card p-6">
      <h3 className="mb-4 text-xl font-bold text-gray-800">
        Tilt Angle Advisor
      </h3>
      <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-200">
        {/* Left Side: Data */}
        <div className="flex-1 space-y-4 pr-0 md:pr-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
              <FaLocationArrow className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Current Panel Tilt
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {currentTilt?.toFixed(1) ?? "N/A"}°
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <FaCompass className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Optimal Tilt (by Latitude)
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {optimalTilt?.toFixed(1) ?? "N/A"}°
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Status */}
        <div className="flex-1 pt-4 md:pt-0 md:pl-6">
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gray-50 p-6 text-center">
            {status.icon}
            <p className={`mt-2 text-xl font-semibold ${status.color}`}>
              {status.message}
            </p>
            {!error && !isLoading && currentTilt !== null && optimalTilt !== null && (
              <p className="mt-1 text-sm text-gray-600">
                Your panel's tilt is {Math.abs(currentTilt - optimalTilt).toFixed(1)}° 
                {currentTilt > optimalTilt ? " steeper" : " shallower"} than the optimal angle.
              </p>
            )}
             {isLoading && (
              <p className="mt-1 text-sm text-gray-600">
                Please allow location access to calculate the optimal tilt.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiltAdvisorCard;