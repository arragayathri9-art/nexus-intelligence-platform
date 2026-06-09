import {
  FaGlobe,
  FaExclamationTriangle,
  FaFutbol,
  FaNewspaper,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const menuItems = [
    { title: "Global Overview", icon: <FaGlobe />, path: "/dashboard" },
    { title: "Disaster Monitor", icon: <FaExclamationTriangle />, path: "/dashboard/disaster" },
    { title: "Sports Center", icon: <FaFutbol />, path: "/dashboard/sports" },
    { title: "Breaking News", icon: <FaNewspaper />, path: "/dashboard/news" },
    { title: "Space Tracker", icon: <FaRocket />, path: "/dashboard/space" },
    { title: "Cyber Monitor", icon: <FaShieldAlt />, path: "/dashboard/cyber" },
  ];

  return (
    <aside className="w-[260px] min-h-screen glass border-r border-cyan-500 p-5 hidden md:block">
      <h1 className="text-3xl font-bold glow-text mb-10">NEXUS</h1>

      <div className="space-y-3">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            end={item.path === "/dashboard"}   // 🔥 FIX ACTIVE MATCH
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition-all duration-300
              ${isActive
                ? "bg-cyan-400 text-black shadow-neon"
                : "hover:bg-cyan-400/20"}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;