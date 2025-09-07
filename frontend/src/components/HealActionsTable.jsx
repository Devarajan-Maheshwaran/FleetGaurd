export default function HealActionsTable({ data }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Heal Actions ({data.length})</h2>
      <ul className="space-y-2">
        {data.map((h, i) => (
          <li key={i} className="p-2 border border-gray-700 rounded">
            <span className="font-semibold">{h.vehicle_id}</span> → {JSON.stringify(h.action)}
          </li>
        ))}
      </ul>
    </div>
  );
}
