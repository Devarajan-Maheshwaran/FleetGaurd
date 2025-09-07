export default function TelemetryTable({ data }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Telemetry ({data.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-2">Vehicle</th>
              <th className="p-2">Temp</th>
              <th className="p-2">Tire</th>
              <th className="p-2">Fuel</th>
              <th className="p-2">Vib</th>
              <th className="p-2">Speed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t, i) => (
              <tr key={i} className="border-b border-gray-600">
                <td className="p-2">{t.vehicle_id}</td>
                <td className="p-2">{t.engine_temp_c}</td>
                <td className="p-2">{t.tire_pressure_psi}</td>
                <td className="p-2">{t.fuel_level_pct}</td>
                <td className="p-2">{t.vibration_idx}</td>
                <td className="p-2">{t.speed_kph}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
