import React from "react";

const VehicleCard = ({ vehicle, status }) => {
  return (
    <div className="border rounded shadow p-4 bg-white hover:shadow-lg transition duration-300">
      <h3 className="font-bold text-lg">{vehicle.vehicle_id}</h3>
      <p>Status: <span className={status?.status === "active" ? "text-green-600" : "text-red-600"}>{status?.status || "Unknown"}</span></p>
      <p>GPS: {status?.gps || "N/A"}</p>
      <p>Network: {status?.network || "N/A"}</p>
      <p>Last Update: {status?.last_update || "N/A"}</p>
    </div>
  );
};

export default VehicleCard;
