import { useEffect, useState } from "react";
import GlobalIntelligenceGlobe from "../../components/maps/GlobalIntelligenceGlobe";

const Dashboard = () => {

  const [stats, setStats] = useState({
    global: 1240,
    cyber: 328,
    space: 96,
    news: 742,
  });

  // LIVE COUNTER ANIMATION
  useEffect(() => {

    const interval = setInterval(() => {

      setStats((prev) => ({
        global: prev.global + Math.floor(Math.random() * 3),
        cyber: prev.cyber + Math.floor(Math.random() * 2),
        space: prev.space + Math.floor(Math.random() * 2),
        news: prev.news + Math.floor(Math.random() * 4),
      }));

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070b17]">

      {/* TOP HEADER */}
      <div className="absolute top-0 left-0 w-full z-50 px-8 py-5">

        <div className="flex items-center justify-between">

          {/* TITLE */}
          <div>

            <h1 className="text-4xl font-bold text-white glow-text">
              NEXUS INTELLIGENCE
            </h1>

            <p className="text-gray-400 mt-1">
              Real-Time Global Intelligence Command Center
            </p>

          </div>

          {/* STATUS */}
          <div className="flex items-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-green-400 text-sm">
              SYSTEM ONLINE
            </p>

          </div>

        </div>

      </div>

      {/* LIVE STATS */}
      <div className="absolute top-28 left-6 z-50 grid grid-cols-2 gap-4 w-[340px]">

        {/* GLOBAL */}
        <div className="glass rounded-2xl border border-cyan-500 p-4 shadow-[0_0_30px_rgba(0,240,255,0.3)]">

          <p className="text-cyan-400 text-sm">
            Global Events
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {stats.global}
          </h2>

        </div>

        {/* CYBER */}
        <div className="glass rounded-2xl border border-purple-500 p-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">

          <p className="text-purple-400 text-sm">
            Cyber Threats
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {stats.cyber}
          </h2>

        </div>

        {/* SPACE */}
        <div className="glass rounded-2xl border border-green-500 p-4 shadow-[0_0_30px_rgba(0,255,157,0.3)]">

          <p className="text-green-400 text-sm">
            Space Signals
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {stats.space}
          </h2>

        </div>

        {/* NEWS */}
        <div className="glass rounded-2xl border border-pink-500 p-4 shadow-[0_0_30px_rgba(255,78,205,0.3)]">

          <p className="text-pink-400 text-sm">
            Breaking News
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {stats.news}
          </h2>

        </div>

      </div>

      {/* GLOBE */}
      <GlobalIntelligenceGlobe stats={stats} />

    </div>
  );
};

export default Dashboard;