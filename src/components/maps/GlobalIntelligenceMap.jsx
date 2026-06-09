import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Event categories
const EVENT_TYPES = [
  { type: "Global Events", color: "#00f0ff" },
  { type: "Cyber Threats", color: "#8b5cf6" },
  { type: "Space Signals", color: "#00ff9d" },
  { type: "Breaking News", color: "#ff4ecd" },
];

// Random world locations (real cities)
const LOCATIONS = [
  { name: "New York", coordinates: [-74, 40], country: "USA" },
  { name: "London", coordinates: [-0.1, 51.5], country: "UK" },
  { name: "Tokyo", coordinates: [139.7, 35.6], country: "Japan" },
  { name: "Delhi", coordinates: [77.1, 28.7], country: "India" },
  { name: "Paris", coordinates: [2.3, 48.8], country: "France" },
  { name: "Dubai", coordinates: [55.3, 25.2], country: "UAE" },
  { name: "Sydney", coordinates: [151.2, -33.8], country: "Australia" },
];

const GlobalIntelligenceMap = () => {
  const [events, setEvents] = useState([]);

  // LIVE EVENT GENERATOR
  useEffect(() => {
    const interval = setInterval(() => {

      const randomLocation =
        LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

      const randomEvent =
        EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];

      const newEvent = {
        id: Date.now(),
        location: randomLocation,
        event: randomEvent,
        strength: Math.floor(Math.random() * 100),
        time: new Date().toLocaleTimeString(),
        target:
          LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 12)]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] glass rounded-2xl border border-cyan-500 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#070b17] to-black opacity-80" />

      {/* MAP */}
      <ComposableMap
        projectionConfig={{ scale: 160 }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#0b1220",
                    stroke: "#00f0ff",
                    strokeWidth: 0.3,
                  },
                  hover: {
                    fill: "#111a2e",
                    stroke: "#00f0ff",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* LIVE MARKERS */}
        {events.map((e) => (
          <Marker key={e.id} coordinates={e.location.coordinates}>

            {/* PULSE DOT */}
            <motion.circle
              r={6}
              fill={e.event.color}
              animate={{
                scale: [1, 2, 1],
                opacity: [1, 0.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />

            {/* GLOW RING */}
            <motion.circle
              r={12}
              fill="transparent"
              stroke={e.event.color}
              strokeWidth={2}
              animate={{
                scale: [1, 2.5],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* TOOLTIP */}
            <title>
              {e.event.type} | {e.location.name} | Strength: {e.strength} | {e.time}
            </title>

          </Marker>
        ))}

        {/* CONNECTION LINES */}
        {events.map((e) => (
          <Line
            key={"line-" + e.id}
            from={e.location.coordinates}
            to={e.target.coordinates}
            stroke={e.event.color}
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray="6 4"
            animate
          />
        ))}
      </ComposableMap>

      {/* FLOATING PANEL */}
      <div className="absolute top-4 right-4 glass p-4 rounded-xl border border-cyan-500 w-[260px]">

        <h2 className="text-cyan-400 font-bold mb-2">
          LIVE INTELLIGENCE FEED
        </h2>

        <AnimatePresence>

          {events.slice(0, 5).map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs mb-2 border-b border-white/10 pb-1"
            >

              <span style={{ color: e.event.color }}>
                ● {e.event.type}
              </span>

              <div className="text-gray-300">
                {e.location.name} → {e.target.name}
              </div>

              <div className="text-gray-500">
                {e.time}
              </div>

            </motion.div>
          ))}

        </AnimatePresence>

      </div>

    </div>
  );
};

export default GlobalIntelligenceMap;