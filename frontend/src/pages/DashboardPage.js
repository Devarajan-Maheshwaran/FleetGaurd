import React, { useContext } from "react";
import { SocketContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";

const DashboardPage = () => {
  const { alerts, vehiclesStatus, driversStatus } = useContext(SocketContext);

  if (!alerts) return <LoadingSpinner />;

  const uptimePercent =
    alerts.length === 0
      ? 100
      : Math.round(
          (alerts.filter((a) => a.status === "resolved").length / alerts.length) *
            100
        );

  const activeAlertsCount = alerts.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">System Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6 text-center">
          <h3 className="text-xl font-semibold">System Uptime</h3>
          <p className="text-4xl font-bold text-green-600">{uptimePercent}%</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <h3 className="text-xl font-semibold">Active Alerts</h3>
          <p className="text-4xl font-bold text-red-600">{activeAlertsCount}</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <h3 className="text-xl font-semibold">Total Vehicles</h3>
          <p className="text-4xl font-bold text-blue-600">{Object.keys(vehiclesStatus).length}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-3">Recent Alerts</h3>
        <div className="max-h-64 overflow-y-auto bg-white rounded shadow p-4">
          {alerts.length === 0 && <p>No alerts so far.</p>}
          {alerts.slice(0, 10).map((alert, idx) => (
            <div
              key={idx}
              className={`p-3 mb-2 rounded border ${
                alert.status === "resolved"
                  ? "border-green-400 bg-green-50"
                  : "border-red-400 bg-red-50"
              }`}
            >
              <p>
                <strong>{alert.vehicle_id}</strong>: {alert.error || alert.log}
              </p>
              {alert.action_taken && (
                <p className="text-green-700 text-sm">{alert.action_taken}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
