"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  Defs,
  linearGradient,
} from "recharts";
import { format } from "date-fns";

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

  return (
    <div className="beautiful-card h-96 p-6">
      <h3 className="mb-6 text-xl font-bold text-gray-800 flex items-center gap-2">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: -20 }}>
          <Defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
            {dataKey2 && (
              <linearGradient id={`gradient-${dataKey2}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color2} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={color2} stopOpacity={0}/>
              </linearGradient>
            )}
          </Defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7} />
          
          <XAxis
            dataKey="createdAt"
            stroke="#6b7280"
            tickFormatter={(str) => format(new Date(str), "MM/dd HH:mm")}
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          
          <YAxis 
            yAxisId="left" 
            stroke="#6b7280" 
            style={{ fontSize: '12px', fontWeight: 500 }} 
          />
          
          {dataKey2 && (
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#6b7280" 
              style={{ fontSize: '12px', fontWeight: 500 }} 
            />
          )}
          
          <Tooltip
            contentStyle={{ 
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
            labelFormatter={(label) => format(new Date(label), "PPpp")}
            separator=": "
          />
          
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          <Area
            yAxisId="left"
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`url(#gradient-${dataKey})`}
            dot={false}
            strokeWidth={3}
            activeDot={{ r: 6, stroke: color, fill: '#fff', strokeWidth: 2 }}
          />
          
          {dataKey2 && color2 && (
            <Area
              yAxisId={dataKey2 === "humidity" ? "right" : "left"} // Keep your logic
              type="monotone"
              dataKey={dataKey2}
              stroke={color2}
              fill={`url(#gradient-${dataKey2})`}
              dot={false}
              strokeWidth={3}
              activeDot={{ r: 6, stroke: color2, fill: '#fff', strokeWidth: 2 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;