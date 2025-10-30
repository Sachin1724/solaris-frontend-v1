"use client";
import { useState } from "react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";

interface FiltersProps {
  onFilter: (filters: { startDate: string; endDate: string }) => void;
  onRefresh: () => void;
}

const Filters = ({ onFilter, onRefresh }: FiltersProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterClick = () => {
    onFilter({ startDate, endDate });
  };

  return (
    <div className="beautiful-card p-6">
      <div className="flex flex-wrap items-end gap-4">
        {/* Date Filters */}
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="startDate"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 transition focus:border-primary-blue focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="endDate"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 transition focus:border-primary-blue focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <button
          onClick={handleFilterClick}
          className="flex h-[46px] items-center gap-2 rounded-lg bg-primary-blue px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
        >
          <FiSearch className="h-4 w-4" />
          Apply Filters
        </button>
        <button
          onClick={onRefresh}
          className="flex h-[46px] items-center gap-2 rounded-lg bg-gray-200 px-6 py-2.5 font-semibold text-gray-700 shadow-lg shadow-gray-500/20 transition-all duration-300 hover:bg-gray-300 hover:shadow-xl hover:shadow-gray-500/30 hover:-translate-y-0.5"
        >
          <FiRefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Filters;