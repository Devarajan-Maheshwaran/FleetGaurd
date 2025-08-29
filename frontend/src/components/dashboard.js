import React from "react";
export default function Dashboard({ alerts }) {
  const uptime = alerts.filter(a => a.status === "resolved").length / (alerts.length || 1);
  return (
    <div className="p-6 bg-white shadow rounded m-4">
      <h2 className="text-2xl font-bold mb-2">FleetGuard Dashboard</h2>
      <div>
        <p>System Health: {Math.round(uptime * 100)}%</p>
        <p>Active Alerts: {alerts.filter(a => a.status === "active").length}</p>
        <p>Recovered: {alerts.filter(a => a.status === "resolved").length}</p>
      </div>
    </div>
  );
}
