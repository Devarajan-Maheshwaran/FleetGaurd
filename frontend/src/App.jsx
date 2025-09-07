import { useEffect, useState } from "react";
import axios from "axios";
import TelemetryTable from "./components/TelemetryTable";
import AnomaliesTable from "./components/AnomaliesTable";
import HealActionsTable from "./components/HealActionsTable";
import VehicleMap from "./components/VehicleMap";
import Charts from "./components/Charts";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

function App() {
  const [telemetry, setTelemetry] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [heals, setHeals] = useState([]);

  async function fetchData() {
    try {
      const [t, a, h] = await Promise.all([
        axios.get(`${BACKEND}/fleet/data/latest`),
        axios.get(`${BACKEND}/fleet/anomaly`),
        axios.get(`${BACKEND}/fleet/heal`),
      ]);
      setTelemetry(t.data);
      setAnomalies(a.data);
      setHeals(h.data);
    } catch (err) {
      console.error("Backend fetch failed:", err.message);
    }
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 shadow-md">
        <h1 className="text-2xl font-bold">FleetGuard Dashboard</h1>
        <p className="text-gray-400 text-sm">Live telemetry, anomaly detection & auto-heal</p>
      </header>

      <main className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-3">
          <Charts telemetry={telemetry} />
        </div>
        <TelemetryTable data={telemetry} />
        <AnomaliesTable data={anomalies} />
        <HealActionsTable data={heals} />
        <div className="col-span-2 lg:col-span-3">
          <VehicleMap telemetry={telemetry} />
        </div>
      </main>
    </div>
  );
}

export default App;
