import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Charts({ telemetry }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Engine Temp & Speed</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={telemetry.slice().reverse()}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="engine_temp_c" stroke="#f87171" name="Temp (C)" />
          <Line type="monotone" dataKey="speed_kph" stroke="#34d399" name="Speed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
