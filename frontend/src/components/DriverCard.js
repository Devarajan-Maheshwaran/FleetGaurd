import React from "react";

const DriverCard = ({ driver, status }) => {
  return (
    <div className="border rounded shadow p-4 bg-white hover:shadow-lg transition duration-300">
      <h3 className="font-bold text-lg">{driver.driver_id}</h3>
      <p>Status: <span className={status?.status === "online" ? "text-green-600" : "text-gray-600"}>{status?.status || "Offline"}</span></p>
      <p>Last Login: {status?.last_login || "N/A"}</p>
      <p>Active Vehicle: {status?.vehicle_id || "None"}</p>
    </div>
  );
};

export default DriverCard;
