"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { format, isValid } from "date-fns"; // Import isValid

interface DataChartProps {
  data: any[];
  title: string;
  dataKey: string;
  color: string;
  dataKey2?: string;
  color2?: string;
}

const DataChart = ({
  data,
  title,
  dataKey,
  color,
  dataKey2,
  color2,
}: DataChartProps) => {
  const chartData = [...data].reverse(); // Keep data oldest-to-newest

  // --- ADDED: Safe date formatter for ticks ---
  const safeTickFormat = (str: string) => {
    const date = new Date(str);
    return isValid(date) ? format(date, "MM/dd HH:mm") : "";
  };

  // --- ADDED: Safe date formatter for tooltip label ---
  const safeLabelFormat = (label: string) => {
    const date = new Date(label);
    return isValid(date) ? format(date, "PPpp") : "Invalid Date";
  };

  return (
    <div className="beautiful-card h-96 p-6">
      <h3 className="mb-6 text-xl font-bold text-gray-800 flex items-center gap-2">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 20, left: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7} />

          <XAxis
            dataKey="createdAt"
            stroke="#6b7280"
            tickFormatter={safeTickFormat} // --- FIXED: Use safe formatter
            style={{ fontSize: "12px", fontWeight: 500 }}
          />

          <YAxis
            yAxisId="left"
            stroke="#6b7280"
            style={{ fontSize: "12px", fontWeight: 500 }}
          />

          {dataKey2 && (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              style={{ fontSize: "12px", fontWeight: 500 }}
            />
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
            labelFormatter={safeLabelFormat} // --- FIXED: Use safe formatter
            separator=": "
          />

          <Legend wrapperStyle={{ paddingTop: "20px" }} />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            dot={false}
            strokeWidth={3}
            activeDot={{ r: 6, stroke: color, fill: "#fff", strokeWidth: 2 }}
            opacity={0.6}
          />

          {dataKey2 && color2 && (
            <Area
              yAxisId={dataKey2 === "humidity" ? "right" : "left"} // Keep your logic
              type="monotone"
              dataKey={dataKey2}
              stroke={color2}
              fill={color2}
              dot={false}
      
              strokeWidth={3}
              activeDot={{ r: 6, stroke: color2, fill: "#fff", strokeWidth: 2 }}
              opacity={0.6}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;