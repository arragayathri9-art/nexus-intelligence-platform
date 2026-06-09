import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>

      <App />

      <ToastContainer
        position="top-right"
        theme="dark"
      />

    </AuthProvider>

  </React.StrictMode>
);