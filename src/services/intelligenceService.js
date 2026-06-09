import axios from "axios";

// USGS EARTHQUAKES
export const fetchEarthquakes = async () => {

  const response = await axios.get(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  );

  return response.data.features;
};

// NASA EONET EVENTS
export const fetchDisasters = async () => {

  const response = await axios.get(
    "https://eonet.gsfc.nasa.gov/api/v3/events"
  );

  return response.data.events;
};

// ISS LOCATION
export const fetchISSLocation = async () => {

  const response = await axios.get(
    "http://api.open-notify.org/iss-now.json"
  );

  return response.data;
};