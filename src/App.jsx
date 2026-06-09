import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DisasterMonitor from "./pages/disaster/DisasterMonitor";
import Dashboard from "./pages/dashboard/Dashboard";
import Disaster from "./pages/disaster/Disaster";
import Sports from "./pages/sports/Sports";
import News from "./pages/news/News";
import Space from "./pages/space/Space";
import Cyber from "./pages/cyber/Cyber";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/disaster" element={<DisasterMonitor />} />
        {/* DASHBOARD LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* CHILD ROUTES */}
          <Route index element={<Dashboard />} />
          <Route path="disaster" element={<Disaster />} />
          <Route path="sports" element={<Sports />} />
          <Route path="news" element={<News />} />
          <Route path="space" element={<Space />} />
          <Route path="cyber" element={<Cyber />} />
          
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;