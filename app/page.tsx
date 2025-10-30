import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="relative min-h-screen p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute -bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl animate-[spin_20s_linear_infinite_reverse]"></div>
      </div>
      
      <div className="max-w-[1800px] mx-auto relative z-10">
        <Header />
        <Dashboard />
      </div>
    </main>
  );
}