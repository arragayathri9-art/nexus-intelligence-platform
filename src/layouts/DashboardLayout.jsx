import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-primary text-white">
      
      {/* SIDEBAR (ONLY ONCE) */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 p-6">

        {/* NAVBAR (ONLY ONCE) */}
        <Navbar />

        {/* THIS IS CRITICAL */}
        <Outlet />

      </div>

    </div>
  );
};

export default DashboardLayout;