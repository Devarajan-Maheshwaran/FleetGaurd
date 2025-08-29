export default function Alerts({ alerts }) {
  return (
    <div className="p-4 bg-red-100 m-4 rounded">
      <h3 className="font-bold text-xl my-2">Active Alerts</h3>
      {alerts.slice(0, 5).map((a, idx) => (
        <div key={idx} className="p-2 border-b">
          <div><b>{a.vehicle_id}</b>: {a.error || a.log}</div>
          {a.action_taken && <div className="text-green-700">{a.action_taken}</div>}
        </div>
      ))}
    </div>
  );
}
