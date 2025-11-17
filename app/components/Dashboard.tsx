"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import StatCard from "./StatCard";
import DataChart from "./DataChart";
import DataTable from "./DataTable";
import Filters from "./Filters";
// --- 1. IMPORT THE NEW COMPONENT ---
import TiltAdvisorCard from "./TiltAdvisorCard"; // Fixed import

// Importing React Icons
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdOutlinePower, MdOutlineNavigation } from "react-icons/md";
import { BsLightningFill, BsSun, BsExclamationTriangleFill } from "react-icons/bs";

// ---
// This interface MUST match the MongoDB schema
// ---
interface SolarData {
  _id: string;
  temperature: number;
  humidity: number;
  dustDensity: number;
  dustVoltage: number;
  voltage: number;
  current: number;
  power: number;
  ldrRaw: number;
  ldrPercent: number;
  tiltAngle: number;
  createdAt: string;
}

interface SortConfig {
  key: keyof SolarData;
  direction: "asc" | "desc";
}

const Dashboard = () => {
  const [data, setData] = useState<SolarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // --- 2. ADD STATE FOR LOCATION DATA (to feed the card) ---
  const [optimalTilt, setOptimalTilt] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Use the env variable, or default to the Render URL
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://solaris-backend.onrender.com";

  const fetchHistoricalData = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!API_URL) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      if (dateRange.startDate) {
        params.append("startDate", dateRange.startDate);
      }
      if (dateRange.endDate) {
        params.append("endDate", dateRange.endDate);
      }
      params.append("sortBy", sortConfig.key);
      params.append("order", sortConfig.direction);

      const response = await axios.get(`${API_URL}/api/data`, { params });
      setData(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        `Failed to fetch data from: ${API_URL}/api/data. Please ensure the backend server is running and accessible.`
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL, dateRange, sortConfig]);

  // --- useEffect for initial data fetch ---
  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  // --- 3. ADD USEEFFECT FOR GEOLOCATION (to get optimal tilt) ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          // Simple rule: Optimal fixed tilt = absolute latitude
          setOptimalTilt(Math.abs(latitude));
          setLocationError(null);
        },
        (err) => {
          console.error("Error getting location:", err);
          setLocationError(
            "Location permission denied. Cannot calculate optimal tilt."
          );
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []); // Empty array, runs once on mount

  // --- useEffect for Socket.io ---
  useEffect(() => {
    if (!API_URL) return;

    // Connect to the Socket.io server
    const socket: Socket = io(API_URL);

    socket.on("connect", () => {
      console.log(`[Socket.io] Connected to server: ${API_URL}`);
    });

    // Listen for the 'newData' event
    socket.on("newData", (newEntry: SolarData) => {
      console.log("[Socket.io] Received new data:", newEntry);
      setData((prevData) => [newEntry, ...prevData]);
    });

    socket.on("disconnect", () => {
      console.log("[Socket.io] Disconnected from server");
    });

    socket.on("connect_error", (err) => {
      console.error(`[Socket.io] Connection Error to ${API_URL}:`, err.message);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [API_URL]);
  // --- END of Socket.io useEffect ---

  const latestData = useMemo(() => {
    return data.length > 0 ? data[0] : null;
  }, [data]);

  const handleSort = (key: keyof SolarData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (filters: { startDate: string; endDate: string }) => {
    setDateRange(filters);
  };

  if (error) {
    return (
      <div className="beautiful-card border-red-500/30 border p-8 text-center fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <BsExclamationTriangleFill className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-3">Connection Error</h2>
        <p className="text-gray-600 mb-4 font-mono text-sm">{error}</p>
        <p className="text-sm text-gray-500">
          This usually means the backend server is offline or the URL in your
          .env.local file is incorrect.
        </p>
      </div>
    );
  }

  if (loading && data.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary-blue"></div>
        <p className="text-lg font-medium text-gray-500">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 fade-in">
      {/* Section 1: Stat Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        <StatCard
          title="Temperature"
          value={`${latestData?.temperature?.toFixed(1) ?? "N/A"} °C`}
          icon={<FaTemperatureHigh className="h-5 w-5 text-[#ef4444]" />}
          iconColor="#ef4444"
        />
        <StatCard
          title="Humidity"
          value={`${latestData?.humidity?.toFixed(1) ?? "N/A"} %`}
          icon={<WiHumidity className="h-6 w-6 text-[#3b82f6]" />}
          iconColor="#3b82f6"
        />
        <StatCard
          title="Power"
          value={`${latestData?.power?.toFixed(2) ?? "N/A"} W`}
          icon={<MdOutlinePower className="h-5 w-5 text-[#22c55e]" />}
          iconColor="#22c55e"
        />
        <StatCard
          title="Voltage"
          value={`${latestData?.voltage?.toFixed(2) ?? "N/A"} V`}
          icon={<BsLightningFill className="h-5 w-5 text-[#eab308]" />}
          iconColor="#eab308"
        />
        <StatCard
          title="Dust"
          value={`${latestData?.dustDensity?.toFixed(2) ?? "N/A"} µg/m³`}
          icon={<FaWind className="h-5 w-5 text-[#6b7280]" />}
          iconColor="#6b7280"
        />
        <StatCard
          title="LDR (Left)"
          value={`${latestData?.ldrPercent?.toFixed(0) ?? "N/A"} %`}
          icon={<BsSun className="h-5 w-5 text-[#f97316]" />}
          iconColor="#f97316"
        />
        <StatCard
          title="Tilt Angle"
          value={`${latestData?.tiltAngle?.toFixed(1) ?? "N/A"} °`}
          icon={<MdOutlineNavigation className="h-5 w-5 text-[#9333ea]" />}
          iconColor="#9333ea"
        />
      </div>

      {/* Section 2: Filters */}
      <Filters onFilter={handleFilter} onRefresh={fetchHistoricalData} />

      {/* --- 4. HERE IS WHERE THE TILT ADVISOR CARD IS PLACED --- */}
      <TiltAdvisorCard
        currentTilt={latestData?.tiltAngle ?? null}
        optimalTilt={optimalTilt}
        isLoading={!optimalTilt && !locationError}
        error={locationError}
      />

      {/* Section 3: Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <DataChart
          data={data}
          title="Power (W) Over Time"
          dataKey="power"
          color="#22c55e"
        />
        <DataChart
          data={data}
          title="Temp (°C) & Humidity (%)"
          dataKey="temperature"
          color="#ef4444"
          dataKey2="humidity"
          color2="#3b82f6"
        />
        <DataChart
          data={data}
          title="Voltage (V) & Current (A)"
          dataKey="voltage"
          color="#eab308"
          dataKey2="current"
          color2="#8b5cf6"
        />
        <DataChart
          data={data}
          title="Dust (µg/m³)"
          dataKey="dustDensity"
          color="#6b7280"
        />
        <DataChart
          data={data}
          title="LDR Light Levels"
          dataKey="ldrRaw"
          color="#f97316"
          dataKey2="ldrPercent"
          color2="#f59e0b"
        />
        <DataChart
          data={data}
          title="Tilt Angle (°)"
          dataKey="tiltAngle"
          color="#9333ea"
        />
      </div>

      {/* Section 4: Data Table */}
      <DataTable
        data={data}
        sortConfig={sortConfig}
        requestSort={handleSort}
      />
    </div>
  );
};

export default Dashboard;