import { FiZap } from "react-icons/fi";
import { FaSolarPanel } from "react-icons/fa";

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
          <FaSolarPanel className="relative h-7 w-7 text-white" />
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-4xl font-bold gradient-text-blue">
            Solaris Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <FiZap className="h-4 w-4 text-gray-400" />
            Real-time Solar Panel Monitoring
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;