import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";
import History from "./components/History";

const socket = io("http://localhost:5000");

function App() {
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("new_alert", (data) => {
      setAlerts((prev) => [data, ...prev].slice(0, 10));
    });

    // Initial history fetch
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Dashboard alerts={alerts} />
      <Alerts alerts={alerts} />
      <History history={history} />
    </div>
  );
}

export default App;
