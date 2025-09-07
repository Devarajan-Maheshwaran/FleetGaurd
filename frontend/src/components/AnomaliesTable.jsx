export default function AnomaliesTable({ data }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Anomalies ({data.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-2">Vehicle</th>
              <th className="p-2">Time</th>
              <th className="p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((a, i) => (
              <tr key={i} className="border-b border-gray-600 text-red-400">
                <td className="p-2">{a.vehicle_id}</td>
                <td className="p-2">{a.timestamp}</td>
                <td className="p-2">{a.predicted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
