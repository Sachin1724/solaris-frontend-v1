"use client";
import { format } from "date-fns";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Define the structure of your data (CHANGED)
interface SolarData {
  _id: string;
  temperature: number;
  humidity: number;
  dust: number; // CHANGED from dustDensity
  voltage: number;
  current: number;
  power: number;
  ldr: number; // CHANGED from ldrLeft
  ldrPercent: number; // CHANGED from ldrRight
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

  // --- CHANGED HEADER ---
  const headers: { key: keyof SolarData; label: string }[] = [
    { key: "createdAt", label: "Timestamp" },
    { key: "power", label: "Power (W)" },
    { key: "voltage", label: "Voltage (V)" },
    { key: "current", label: "Current (A)" },
    { key: "temperature", label: "Temp (°C)" },
    { key: "humidity", label: "Humidity (%)" },
    { key: "dust", label: "Dust (µg/m³)" }, // CHANGED from dustDensity
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
                  {format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss")}
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
                {/* --- CHANGED DATA CELL --- */}
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-500">
                  {row.dust?.toFixed(2) ?? "N/A"}
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