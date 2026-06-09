import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const LOCATIONS = [
  {
    city: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    city: "London",
    country: "UK",
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    city: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    city: "Delhi",
    country: "India",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    city: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    city: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    city: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
  },
];

const EVENT_TYPES = [
  {
    type: "Global Events",
    color: "#00f0ff",
  },
  {
    type: "Cyber Threats",
    color: "#8b5cf6",
  },
  {
    type: "Space Signals",
    color: "#00ff9d",
  },
  {
    type: "Breaking News",
    color: "#ff4ecd",
  },
];

const GlobalIntelligenceGlobe = () => {

  const globeRef = useRef();

  const [events, setEvents] = useState([]);
  const [arcs, setArcs] = useState([]);

  // INITIAL CAMERA
  useEffect(() => {

    if (globeRef.current) {

      globeRef.current.pointOfView(
        {
          lat: 20,
          lng: 0,
          altitude: 2.1,
        },
        3000
      );

      // AUTO ROTATE
      globeRef.current.controls().autoRotate = true;

      globeRef.current.controls().autoRotateSpeed = 0.4;
    }

  }, []);

  // LIVE EVENTS
  useEffect(() => {

    const generateEvent = () => {

      const randomLocation =
        LOCATIONS[
          Math.floor(
            Math.random() * LOCATIONS.length
          )
        ];

      const randomTarget =
        LOCATIONS[
          Math.floor(
            Math.random() * LOCATIONS.length
          )
        ];

      const randomType =
        EVENT_TYPES[
          Math.floor(
            Math.random() * EVENT_TYPES.length
          )
        ];

      const newEvent = {

        id: Date.now(),

        lat: randomLocation.lat,
        lng: randomLocation.lng,

        city: randomLocation.city,
        country: randomLocation.country,

        type: randomType.type,
        color: randomType.color,

        timestamp:
          new Date().toLocaleTimeString(),

        size:
          Math.random() * 0.15 + 0.18,
      };

      const newArc = {

        startLat: randomLocation.lat,
        startLng: randomLocation.lng,

        endLat: randomTarget.lat,
        endLng: randomTarget.lng,

        color: randomType.color,
      };

      // KEEP LIMITED EVENTS
      setEvents((prev) => {

        const updated =
          [...prev, newEvent];

        return updated.slice(-8);
      });

      setArcs((prev) => {

        const updated =
          [...prev, newArc];

        return updated.slice(-8);
      });
    };

    // INSTANT START
    for (let i = 0; i < 6; i++) {
      generateEvent();
    }

    // CONTINUOUS LIVE EVENTS
    const interval =
      setInterval(generateEvent, 2500);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="w-full h-screen relative z-0">

      <Globe
        ref={globeRef}

        width={window.innerWidth}
        height={window.innerHeight}

        backgroundColor="rgba(0,0,0,0)"

        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        // EVENTS
        pointsData={events}

        pointLat="lat"
        pointLng="lng"

        pointColor="color"

        pointAltitude={0.15}

        pointRadius="size"
        // LIVE LOCATION LABELS
labelsData={events.slice(-8)}

labelLat={(d) => d.lat}

labelLng={(d) => d.lng}

labelText={(d) => `📍 ${d.city}`}

labelSize={1.5}

labelColor={() => "#ffffff"}

labelResolution={2}

labelDotRadius={0.35}

labelAltitude={0.22}

        pointsMerge={false}

        // GLOW EFFECT
        ringsData={events}

        ringLat="lat"
        ringLng="lng"

        ringColor="color"

        ringMaxRadius={4}

        ringPropagationSpeed={2}

        ringRepeatPeriod={1200}

        // TOOLTIPS
        pointLabel={(d) => `
            
          <div style="
            background:black;
            padding:10px;
            border-radius:10px;
            border:1px solid ${d.color};
            color:white;
          ">
            <b>${d.type}</b><br/>
            ${d.city}, ${d.country}<br/>
            ${d.timestamp}
          </div>
        `}

        // CONNECTION LINES
        arcsData={arcs}

        arcColor="color"

        arcAltitude={0.25}

        arcStroke={0.7}

        arcDashLength={0.4}

        arcDashGap={2}

        arcDashAnimateTime={1800}

        // ATMOSPHERE
        atmosphereColor="#00f0ff"

        atmosphereAltitude={0.18}
      />

      {/* RADAR OVERLAY */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-cyan-500/20 rounded-full animate-ping" />

      </div>

    </div>
  );
};

export default GlobalIntelligenceGlobe;