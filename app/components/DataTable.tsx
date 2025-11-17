"use client";
import { format, isValid } from "date-fns"; // Import isValid
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// ---
// This interface MUST match the MongoDB schema
// ---
interface SolarData {
  _id: string;
  temperature: number;
  humidity: number;
  dustDensity: number; // Use schema key
  voltage: number;
  current: number;
  power: number;
  ldrRaw: number; // Use schema key
  ldrPercent: number;
  tiltAngle: number; // ADDED tiltAngle
  createdAt: string;
}

interface SortConfig {
  key: keyof SolarData;
  direction: "asc" | "desc";
}

interface DataTableProps {
  data: SolarData[];
  sortConfig: SortConfig;
  requestSort: (key: keyof SolarData) => void;
}

const DataTable = ({ data, sortConfig, requestSort }: DataTableProps) => {
  const getSortIcon = (key: keyof SolarData) => {
    if (sortConfig.key !== key) {
      return <span className="opacity-30"><FaArrowDown /></span>;
    }
    if (sortConfig.direction === "asc") {
      return <FaArrowUp className="ml-1 h-3 w-3 text-primary-blue" />;
    }
    return <FaArrowDown className="ml-1 h-3 w-3 text-primary-blue" />;
  };

  // Helper function to safely format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Check if the date is valid before formatting
    return isValid(date) ? format(date, "yyyy-MM-dd HH:mm:ss") : "Invalid Date";
  };

  const headers: { key: keyof SolarData; label: string }[] = [
    { key: "createdAt", label: "Timestamp" },
    { key: "power", label: "Power (W)" },
    { key: "voltage", label: "Voltage (V)" },
    { key: "current", label: "Current (A)" },
    { key: "temperature", label: "Temp (°C)" },
    { key: "humidity", label: "Humidity (%)" },
    { key: "dustDensity", label: "Dust (µg/m³)" },
    { key: "tiltAngle", label: "Tilt (°)" },
  ];

  return (
    <div className="w-full overflow-hidden beautiful-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className="cursor-pointer px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-200"
                  onClick={() => requestSort(header.key)}
                >
                  <span className="flex items-center gap-1.5">
                    {header.label}
                    {getSortIcon(header.key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row) => (
              <tr key={row._id} className="transition-colors hover:bg-blue-50/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                  {/* --- USE THE SAFE FORMATTER --- */}
                  {formatDate(row.createdAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-green-600">
                  {row.power?.toFixed(2) ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-yellow-600">
                  {row.voltage?.toFixed(2) ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-blue-600">
                  {row.current?.toFixed(3) ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-red-600">
                  {row.temperature?.toFixed(1) ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-cyan-600">
                  {row.humidity?.toFixed(1) ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-500">
                  {row.dustDensity?.toFixed(2) ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-purple-600">
                  {row.tiltAngle?.toFixed(1) ?? "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;