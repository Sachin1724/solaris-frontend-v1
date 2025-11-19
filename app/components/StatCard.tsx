import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconColor: string;
}

const StatCard = ({ title, value, icon, iconColor }: StatCardProps) => {
  return (
    <div className="beautiful-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </span>
        <div 
          className="h-9 w-9 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}1A` }} // e.g., #007aff + 1A for 10% opacity
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default StatCard;