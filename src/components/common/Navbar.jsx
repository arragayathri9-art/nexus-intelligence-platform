import { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = () => {

  const [time, setTime] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("Searching:", e.target.value);
  };

  return (
    <nav className="glass border border-cyan-500 p-4 rounded-2xl flex items-center justify-between mb-6">

      <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-xl w-[40%]">
        <FaSearch className="text-cyan-400" />

        <input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search intelligence..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="text-cyan-400 font-bold">{time}</div>

        <div className="relative">
          <FaBell className="text-2xl text-cyan-400 cursor-pointer" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <FaUserCircle className="text-3xl text-cyan-400 cursor-pointer" />
      </div>

    </nav>
  );
};

export default Navbar;