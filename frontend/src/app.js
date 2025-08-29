import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import VehiclesPage from "./pages/VehiclesPage";
import DriversPage from "./pages/DriversPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const socket = io("http://localhost:5000");

export const SocketContext = React.createContext();

function App() {
  // User auth (simplified demo)
  const [user, setUser] = useState(null);

  // Real-time data states
  const [alerts, setAlerts] = useState([]);
  const [vehiclesStatus, setVehiclesStatus] = useState({});
  const [driversStatus, setDriversStatus] = useState({});

  useEffect(() => {
    socket.on("new_alert", (alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 50));
    });

    socket.on("vehicle_status", (status) => {
      setVehiclesStatus((prev) => ({ ...prev, [status.vehicle_id]: status }));
    });

    socket.on("driver_status", (status) => {
      setDriversStatus((prev) => ({ ...prev, [status.driver_id]: status }));
    });

    return () => {
      socket.off("new_alert");
      socket.off("vehicle_status");
      socket.off("driver_status");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        alerts,
        vehiclesStatus,
        driversStatus,
        user,
        setUser,
      }}
    >
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar user={user} />
          <div className="flex flex-col flex-grow">
            <Navbar user={user} setUser={setUser} />
            <main className="flex-grow overflow-auto p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/drivers" element={<DriversPage />} />
                <Route
                  path="/login"
                  element={<LoginPage user={user} setUser={setUser} />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
