import React, { useContext, useState, useMemo } from "react";
import { SocketContext } from "../App";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";

const VehiclesPage = () => {
  const { vehiclesStatus } = useContext(SocketContext);
  const [search, setSearch] = useState("");

  // Convert vehiclesStatus object to array for mapping
  const vehicles = useMemo(() => Object.values(vehiclesStatus), [vehiclesStatus]);

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicle_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-4">Vehicles</h2>

      <SearchBar value={search} onChange={setSearch} placeholder="Search vehicles..." />

      {filteredVehicles.length === 0 ? (
        <p className="mt-6 text-center text-gray-500">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredVehicles.map((v) => (
            <VehicleCard key={v.vehicle_id} vehicle={v} status={v} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
