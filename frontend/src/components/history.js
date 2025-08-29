export default function History({ history }) {
  return (
    <div className="bg-blue-50 p-4 m-4 rounded">
      <h3 className="font-bold text-xl mb-2">Recovery History</h3>
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th>Time</th><th>Vehicle</th><th>Error</th><th>Action</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.slice(0, 10).map((h, i) => (
            <tr key={i}>
              <td>{h.timestamp}</td>
              <td>{h.vehicle_id}</td>
              <td>{h.error || "-"}</td>
              <td>{h.action_taken || "-"}</td>
              <td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
