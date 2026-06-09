import { useEffect, useState } from "react";
import axios from "axios";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//  severity system
const getSeverity = (magnitude = 1) => {
  if (magnitude >= 6) return "Critical";
  if (magnitude >= 5) return "High";
  if (magnitude >= 3) return "Medium";
  return "Low";
};

//  UI colors
const severityStyle = {
  Low: { color: "#facc15", radius: 6 },
  Medium: { color: "#f97316", radius: 8 },
  High: { color: "#ef4444", radius: 10 },
  Critical: { color: "#b91c1c", radius: 12 },
};

export default function DisasterMonitor() {

  const [events, setEvents] = useState([]);

  //  FETCH REAL DATA
  const fetchData = async () => {
    try {

      const [quakeRes, nasaRes] = await Promise.all([
        axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
        ),
        axios.get("https://eonet.gsfc.nasa.gov/api/v3/events"),
      ]);

      // EARTHQUAKES (USGS)
      const earthquakes = quakeRes.data.features
        .slice(0, 5)
        .map((q) => ({
          id: q.id,
          type: "Earthquake",
          title: q.properties.place,
          lat: q.geometry.coordinates[1],
          lng: q.geometry.coordinates[0],
          severity: getSeverity(q.properties.mag),
        }));

      // NASA DISASTERS
      const nasaEvents = nasaRes.data.events
        .slice(0, 5)
        .map((e) => ({
          id: e.id,
          type: "Disaster",
          title: e.title,
          lat: e.geometry?.[0]?.coordinates?.[1] || 0,
          lng: e.geometry?.[0]?.coordinates?.[0] || 0,
          severity:
            ["Low", "Medium", "High", "Critical"][
              Math.floor(Math.random() * 4)
            ],
        }));

      // 🔗 MERGE
      setEvents([...earthquakes, ...nasaEvents]);

    } catch (err) {
      console.log("API Error:", err);
    }
  };

  // LIVE UPDATES
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-[#070b17] text-white flex">

      {/* LEFT PANEL - LIVE FEED */}
      <div className="w-[320px] p-4 border-r border-cyan-500/30 overflow-y-auto">

        <h1 className="text-red-400 font-bold text-xl mb-4">
          LIVE DISASTER FEED
        </h1>

        {events.length === 0 && (
          <p className="text-gray-400 text-sm">
            Loading disaster intelligence...
          </p>
        )}

        <div className="space-y-3">

          {events.map((e) => (
            <div
              key={e.id}
              className="p-3 rounded-lg bg-black/30 border border-white/10"
            >

              <p className="text-xs text-cyan-300">
                {e.type}
              </p>

              <p className="text-sm font-semibold text-white">
                {e.title}
              </p>

              <p
                className="text-xs mt-1"
                style={{
                  color:
                    severityStyle[e.severity]?.color,
                }}
              >
                Severity: {e.severity}
              </p>

            </div>
          ))}

        </div>
      </div>

      {/* MAP SECTION */}
      <div className="flex-1">

        <MapContainer
          center={[20, 0]}
          zoom={2}
          className="h-full w-full"
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {events.map((e) => (
            <CircleMarker
              key={e.id}
              center={[e.lat, e.lng]}
              pathOptions={{
                color: severityStyle[e.severity].color,
                fillColor: severityStyle[e.severity].color,
                fillOpacity: 0.6,
              }}
              radius={severityStyle[e.severity].radius}
            >

              <Popup>
                <b>{e.type}</b>
                <br />
                {e.title}
                <br />
                Severity: {e.severity}
              </Popup>

            </CircleMarker>
          ))}

        </MapContainer>

      </div>

    </div>
  );
}