import React, { useContext, useState, useMemo } from "react";
import { SocketContext } from "../App";
import SearchBar from "../components/SearchBar";
import DriverCard from "../components/DriverCard";

const DriversPage = () => {
  const { driversStatus } = useContext(SocketContext);
  const [search, setSearch] = useState("");

  const drivers = useMemo(() => Object.values(driversStatus), [driversStatus]);

  const filteredDrivers = drivers.filter((d) =>
    d.driver_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-4">Drivers</h2>

      <SearchBar value={search} onChange={setSearch} placeholder="Search drivers..." />

      {filteredDrivers.length === 0 ? (
        <p className="mt-6 text-center text-gray-500">No drivers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredDrivers.map((d) => (
            <DriverCard key={d.driver_id} driver={d} status={d} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DriversPage;
